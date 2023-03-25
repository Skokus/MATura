package com.example.demo.users.tokens;

import com.example.demo.users.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Getter @Setter
@NoArgsConstructor
@Document(collection = "tokens")
public class RegisterToken {

    @Id
    private String id;
    private String token;
    private LocalDateTime createAt;
    private LocalDateTime expiresAt;
    private LocalDateTime confirmedAt;
    private User user;

    public RegisterToken(String token, LocalDateTime createAt, LocalDateTime expiresAt, User user) {
        this.token = token;
        this.createAt = createAt;
        this.expiresAt = expiresAt;
        this.user = user;
    }
}
