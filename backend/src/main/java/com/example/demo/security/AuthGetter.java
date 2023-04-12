package com.example.demo.security;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Base64;

public class AuthGetter<T> {
    private final String auth;

    public AuthGetter(String auth) {
        this.auth = auth;
    }

    public String getAuth() {
        String token = auth.substring(7);
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String payload = new String(decoder.decode(chunks[1]));
        JSONObject obj = new JSONObject(payload);
        return obj.getString("sub");
    }

    public ResponseEntity<T> getResponse() {
        if (auth == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } else if (!auth.startsWith("Bearer ")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return null;
        }
    }
}