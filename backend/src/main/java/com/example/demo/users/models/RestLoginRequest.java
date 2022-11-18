package com.example.demo.users.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter @Setter
public class RestLoginRequest {
    private String username;
    private String password;
}
