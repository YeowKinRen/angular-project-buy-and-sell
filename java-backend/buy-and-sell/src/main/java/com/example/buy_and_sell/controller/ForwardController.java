package com.example.buy_and_sell.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardController {

    // This matches any path that does not contain a dot (e.g., .js, .css, .png)
    @GetMapping(value = "/**/{path:[^\\.]*}")
    public String redirect() {
        return "forward:/index.html";
    }
}
