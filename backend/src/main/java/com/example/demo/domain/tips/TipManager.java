package com.example.demo.domain.tips;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TipManager implements TipService{

    public final TipRepository tipRepository;

    public Tip saveTip(Tip t) {
        tipRepository.save(t);
        return t;
    }

    public List<Tip> getAllTips() {
        return tipRepository.findAll();
    }

    public Tip getTipById(String id) {
        return tipRepository.findById(id).get();
    }

    public void removeTip(String id) {
        tipRepository.deleteById(id);
    }

    public Tip editTip(Tip t, String id) {
        Optional<Tip> tip = tipRepository.findById(id);
        if(tip.isEmpty()){

        }
        Tip tp = tip.get();
        tp.setName(t.getName());
        tp.setContent(t.getContent());
        tipRepository.save(tp);
        return tp;
    }
}
