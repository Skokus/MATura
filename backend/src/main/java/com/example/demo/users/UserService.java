package com.example.demo.users;

import com.example.demo.domain.category.CategoryRepository;
import com.example.demo.users.email.EmailSender;
import com.example.demo.users.exceptions.UserAlreadyExistsException;
import com.example.demo.users.models.RestRegisterUserRequest;
import com.example.demo.users.models.Role;
import com.example.demo.users.models.User;
import com.example.demo.users.tokens.RegisterToken;
import com.example.demo.users.tokens.RegisterTokenService;
import com.example.demo.users.userprogress.UserProgress;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CategoryRepository categoryRepository;
    private final RegisterTokenService registerTokenService;
    private final EmailSender emailSender;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findUserByUsername(username);
        if(user.isEmpty()){
            log.error("User not found");
            throw new UsernameNotFoundException("User not found");
        } else {
            log.info("User found");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.get().getRole().name()));
        User u = user.get();
        return new org.springframework.security.core.userdetails.User(u.getUsername(), u.getPassword(), u.isEnabled(), u.isAccountNonExpired(), u.isCredentialsNonExpired(), u.isAccountNonLocked(), authorities);
    }

    public String registerUser(RestRegisterUserRequest r){
        if(userRepository.findUserByUsername(r.getUsername()).isPresent() || userRepository.findUserByEmail(r.getEmail()).isPresent())
            throw new UserAlreadyExistsException("User exists!");
        User user = new User(r.getEmail(), r.getUsername(), r.getPassword(), Role.ROLE_USER, categoryRepository.findAll());
        user.setPassword(passwordEncoder.encode(r.getPassword()));
        log.info("New user registered: {}", r.getUsername());
        String token = UUID.randomUUID().toString();
        RegisterToken registertoken = new RegisterToken(token, LocalDateTime.now(), LocalDateTime.now().plusMinutes(15), user);
        registerTokenService.saveRegisterToken(registertoken);
        userRepository.save(user);
        System.out.println(user.getEnabled());
        String link = "http://localhost:3000/confirm/" + token;
        emailSender.send(r.getEmail(), emailSender.buildEmail(r.getUsername(), link));
        return token;
    }

    public User saveUser(User u){
        log.info("Saving new user {} to the database", u.getUsername());
        u.setPassword(passwordEncoder.encode(u.getPassword()));
        u.setUserProgress(new UserProgress(categoryRepository.findAll()));
        u.setEnabled(true);
        return userRepository.save(u);
    }

    public User getUserByUsername(String username){
        Optional<User> user = userRepository.findUserByUsername(username);
        if(user.isEmpty()){
            throw new UsernameNotFoundException("User not found");
        }
        return user.get();
    }

    public User getUserByEmail(String email){
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isEmpty()){
            throw new UsernameNotFoundException("User not found");
        }
        return user.get();
    }
    public void removeUser(String id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public String confirmToken(String token) {
        RegisterToken confirmationToken = registerTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        registerTokenService.setConfirmedAt(token);
        User u = userRepository.findUserByUsername(confirmationToken.getUser().getUsername()).get();
        u.setEnabled(true);
        userRepository.save(u);
        return "confirmed";
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

}
