package com.wallace.controller;

import com.wallace.utils.Result;
import org.springframework.web.bind.annotation.*;

/**
 * ClassName: TeamController
 * Package: com.wallace.controller
 * Description:
 *
 * @Author yajuxi
 */
@RestController
@RequestMapping("share")
@CrossOrigin
public class TeamController {

    @GetMapping("")
    public Result findCkByCid(@RequestHeader("x-ms-client-principal-id") Integer uid){
        return  null;
    }
}
