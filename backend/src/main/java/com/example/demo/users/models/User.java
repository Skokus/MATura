package com.example.demo.users.models;

import com.example.demo.category.models.Category;
import com.example.demo.users.userprogress.UserProgress;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Document(collection = "users")
@Getter @Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    private String id;
    private String email;
    private String username;
    private String password;
    private Role role;
    private Boolean locked = false;
    private Boolean enabled = false;

    private UserProgress userProgress;

    public User(String email, String username, String password, Role role, List<Category> categoryList){
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
        this.userProgress = new UserProgress(categoryList);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.name());
        return Collections.singletonList(authority);
    }

}
