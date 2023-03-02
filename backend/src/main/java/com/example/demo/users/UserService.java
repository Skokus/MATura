package com.example.demo.users;

import com.example.demo.category.CategoryRepository;
import com.example.demo.users.exceptions.UserAlreadyExistsException;
import com.example.demo.users.models.RestRegisterUserRequest;
import com.example.demo.users.models.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CategoryRepository categoryRepository;

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
        authorities.add(new SimpleGrantedAuthority(user.get().getRole()));
        return new org.springframework.security.core.userdetails.User(user.get().getUsername(), user.get().getPassword(), authorities);
    }

    public void registerUser(RestRegisterUserRequest r){
        if(userRepository.findUserByUsername(r.getUsername()).isPresent() || userRepository.findUserByEmail(r.getEmail()).isPresent())
            throw new UserAlreadyExistsException("User exists!");
        User user = new User(r.getEmail(), r.getUsername(), r.getPassword(), "ROLE_USER", categoryRepository.findAll());
        user.setPassword(passwordEncoder.encode(r.getPassword()));
        log.info("New user registered: {}", r.getUsername());
        userRepository.save(user);
    }

    public User saveUser(User u){
        log.info("Saving new user {} to the database", u.getUsername());
        u.setPassword(passwordEncoder.encode(u.getPassword()));
        return userRepository.save(u);
    }

    public User getUserByUsername(String username){
        Optional<User> user = userRepository.findUserByUsername(username);
        if(user.isEmpty()){
            throw new UsernameNotFoundException("User not found");
        }
        return user.get();
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

}
