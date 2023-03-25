package com.example.demo.users.tokens;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RegisterTokenService {

    RegisterTokenRepository registerTokenRepository;

    public void saveRegisterToken(RegisterToken token){
        registerTokenRepository.save(token);
    }

    public Optional<RegisterToken> getToken(String token) {
        return registerTokenRepository.findByToken(token);
    }

    public void setConfirmedAt(String token) {
        RegisterToken t = registerTokenRepository.findByToken(token).get();
        t.setConfirmedAt(LocalDateTime.now());
        registerTokenRepository.save(t);
    }
}
