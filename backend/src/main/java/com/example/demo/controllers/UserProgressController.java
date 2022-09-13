package com.example.demo.controllers;

import com.example.demo.models.UserProgress;
import com.example.demo.services.UserProgressService;
import com.example.demo.utility.AuthGetter;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/userprogress")
public class UserProgressController {

    private final UserProgressService userProgressService;
    private final HttpServletRequest request;

    @RequestMapping(value = "", method = RequestMethod.GET)
    @Operation(summary = "Get user's progress")
    public ResponseEntity<UserProgress> plantsGet() {
        String accept = request.getHeader("Accept");
        String auth = request.getHeader("Authorization");
        AuthGetter<UserProgress> authGetter = new AuthGetter<>(auth);
        if (authGetter.getResponse() != null) {
            return authGetter.getResponse();
        } else {
            auth = authGetter.getAuth();
            System.out.println(auth);
        }
        try {
            if (accept != null && (accept.contains("application/json") || accept.contains("*/*") || accept.contains("application/*"))) {
                return new ResponseEntity<>(userProgressService.getUserProgress(auth), HttpStatus.OK);
            }
        } catch (NullPointerException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
