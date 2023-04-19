package com.example.demo.users;

import com.example.demo.users.models.RestRegisterUserRequest;
import com.example.demo.users.models.User;
import com.example.demo.users.models.UserInfo;
import com.example.demo.security.AuthGetter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@Tag(name = "UserController")
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final HttpServletRequest request;

    @RequestMapping(value = "/checkUserStatus", method = RequestMethod.GET)
    @Operation(summary = "Check if user with userName exists")
    public ResponseEntity<Boolean> checkIfExists(@RequestParam(required = false) String username, @RequestParam(required = false) String email) {
        try{
            if(username != null) {
                userService.getUserByUsername(username);
            } else if (email != null) {
                userService.getUserByEmail(email);
            } else {
                return new ResponseEntity<>(false, HttpStatus.OK);
            }
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
        return new ResponseEntity<>(token, HttpStatus.CREATED);
    }

    @GetMapping(path = "/confirm")
    public ResponseEntity<Map<String, String>> confirm(@RequestParam("token") String token) {
        String s;
        try{
            s = userService.confirmToken(token);
        } catch (IllegalStateException e) {
            s = "error";
        }
        Map<String, String> r = Collections.singletonMap("state", s);
        return new ResponseEntity<>(r, HttpStatus.OK);
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

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @Operation(summary = "Delete user")
    public ResponseEntity removeTip(@PathVariable String id){
        userService.removeUser(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    private UserInfo getUserInfo(User u){
        UserInfo uf = new UserInfo();
        uf.setId(u.getId());
        uf.setUsername(u.getUsername());
        uf.setEmail(u.getEmail());
        uf.setRole(u.getRole());
        uf.setUserProgress(u.getUserProgress());
        return uf;
    }

}
