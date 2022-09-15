package com.example.demo.controllers;

import com.example.demo.models.UserProgress;
import com.example.demo.services.UserProgressService;
import com.example.demo.utility.AuthGetter;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/userprogress")
public class UserProgressController {

    private final UserProgressService userProgressService;
    private final HttpServletRequest request;

    @RequestMapping(value = "", method = RequestMethod.GET)
    @Operation(summary = "Get user's progress")
    public ResponseEntity<UserProgress> getUserProgress() {
        String accept = request.getHeader("Accept");
        String auth = request.getHeader("Authorization");
        AuthGetter<UserProgress> authGetter = new AuthGetter<>(auth);
        if (authGetter.getResponse() != null) {
            return authGetter.getResponse();
        } else {
            auth = authGetter.getAuth();
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

    @RequestMapping(value = "/{categoryName}/{id}", method = RequestMethod.PATCH)
    @Operation(summary = "Mark task as category")
    public ResponseEntity markTaskAsDone(@PathVariable String categoryName, @PathVariable String id) {
        String accept = request.getHeader("Accept");
        String auth = request.getHeader("Authorization");
        AuthGetter<UserProgress> authGetter = new AuthGetter<>(auth);
        if (authGetter.getResponse() != null) {
            return authGetter.getResponse();
        } else {
            auth = authGetter.getAuth();
        }
        try {
            if (accept != null && (accept.contains("application/json") || accept.contains("*/*") || accept.contains("application/*"))) {
                userProgressService.markTaskAsDone(auth, id, categoryName);
                return new ResponseEntity(HttpStatus.OK);
            }
        } catch (NullPointerException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
