package com.example.demo.photos;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PhotoService {

    private final PhotoRepository photoRepo;

    public List<String> addPhotos(MultipartFile[] files) throws IOException {
        List<String> ids = new ArrayList<>();
        for(MultipartFile file : files){
            Photo photo = new Photo();
            photo.setImage(
                    new Binary(BsonBinarySubType.BINARY, file.getBytes()));
            photo = photoRepo.insert(photo);
            ids.add(photo.getId());
        }
        return ids;
    }

    public Photo getPhoto(String id) {
        return photoRepo.findById(id).get();
    }

    public void removePhoto(String id){
        photoRepo.deleteById(id);
    }
}