package com.example.demo.users.models;

import com.example.demo.users.userprogress.UserProgress;
import lombok.*;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
public class UserInfo {
    @Id
    private String id;
    private String email;
    private String username;
    private Role role;
    private UserProgress userProgress;
}
