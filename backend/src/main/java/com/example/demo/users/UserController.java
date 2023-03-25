package com.example.demo.users;

import com.example.demo.users.models.RestRegisterUserRequest;
import com.example.demo.users.models.User;
import com.example.demo.utility.AuthGetter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@Tag(name = "UserController")
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final HttpServletRequest request;

    @RequestMapping(value = "/checkUserStatus/{username}", method = RequestMethod.GET)
    @Operation(summary = "Check if user exists")
    public ResponseEntity<Boolean> checkIfExists(@PathVariable String username) {
        try{
            userService.getUserByUsername(username);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }catch(UsernameNotFoundException e) {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    @Operation(summary = "Create user")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @Operation(summary = "Register user")
    public ResponseEntity<String> createUser(@RequestBody RestRegisterUserRequest request) {
        String token = userService.registerUser(request);
        return new ResponseEntity<String>(token, HttpStatus.CREATED);
    }

    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        return userService.confirmToken(token);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    @Operation(summary = "Get all users")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
    @Operation(summary = "Get user by username")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        return new ResponseEntity<>(userService.getUserByUsername(username), HttpStatus.OK);
    }

    @RequestMapping(value = "/token", method = RequestMethod.GET)
    @Operation(summary = "Get user info")
    public ResponseEntity<User> getUserWithToken(){
        String accept = request.getHeader("Accept");
        String auth = request.getHeader("Authorization");
        AuthGetter<User> authGetter = new AuthGetter<>(auth);
        if (authGetter.getResponse() != null) {
            return authGetter.getResponse();
        } else {
            auth = authGetter.getAuth();
        }
        try {
            if (accept != null && (accept.contains("application/json") || accept.contains("*/*") || accept.contains("application/*"))) {
                return new ResponseEntity<>(userService.getUserByUsername(auth), HttpStatus.OK);
            }
        } catch (NullPointerException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
