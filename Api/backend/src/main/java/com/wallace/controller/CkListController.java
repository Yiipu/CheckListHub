package com.wallace.controller;

/**
 * ClassName: CkListController
 * Package: com.wallace.controller
 * Description: checklist控制层
 *
 * @Author yajuxi
 */

import com.wallace.pojo.CkList;
import com.wallace.service.CkListService;
import com.wallace.service.UserService;
import com.wallace.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("ck")
@CrossOrigin
public class CkListController {
    @Autowired
    private CkListService ckListService;
    @GetMapping("/{cid}")
    public Result findCkByCid(@PathVariable(name = "cid") Integer cid){
        Result result = ckListService.findByCid(cid);
        return result;
    }

}
