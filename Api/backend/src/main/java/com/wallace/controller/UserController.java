package com.wallace.controller;

import com.wallace.service.CkListService;
import com.wallace.service.UserService;
import com.wallace.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * ClassName: UserController
 * Package: com.wallace.controller
 * Description: User Controller
 *
 * @Author yajuxi
 */
@RestController
@RequestMapping("user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;
    /*
     * @Author yajuxi
     * @Description 根据cid查找checklist
     * @Param [cid]
     * @return com.wallace.utils.Result
     **/
    @GetMapping("")
    public Result userInit(@RequestHeader("uid") Integer uid){
        Result result = userService.userInit(uid);
        return result;
    }
}
