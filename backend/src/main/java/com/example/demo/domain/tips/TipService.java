package com.example.demo.domain.tips;

import java.util.List;

public interface TipService {
    Tip saveTip(Tip t);
    List<Tip> getAllTips();
    Tip getTipById(String id);
    void removeTip(String id);
    Tip editTip(Tip t, String id);
}
