package com.example.demo.photos;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;


@RestController
@Tag(name = "PhotoController")
@RequestMapping(value = "/api/photos")
@RequiredArgsConstructor
public class PhotoController {

    private final PhotoService photoService;

    @PostMapping("")
    public List<String> addPhoto(@RequestParam("images[]") MultipartFile[] images, Model model)
            throws IOException {
        List<String> ids = photoService.addPhotos(images);
        return ids;
    }

    @GetMapping("/{id}")
    public Photo getPhoto(@PathVariable String id) {
        return photoService.getPhoto(id);
    }
}
