package com.example.demo.photos;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;


@RestController
@Tag(name = "PhotoController")
@RequestMapping(value = "/api/photos")
@RequiredArgsConstructor
public class PhotoController {

    private final PhotoService photoService;

    @PostMapping("")
    public String addPhoto(@RequestParam("title") String title,
                           @RequestParam("image") MultipartFile image, Model model)
            throws IOException {
        String id = photoService.addPhoto(title, image);
        return "redirect:/photos/" + id;
    }

    @GetMapping("/{id}")
    public Photo getPhoto(@PathVariable String id) {
        return photoService.getPhoto(id);
    }
}
