package com.wallace.controller;

import com.wallace.service.CkListService;
import com.wallace.service.ListcollectionService;
import com.wallace.service.UserService;
import com.wallace.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * ClassName: SearchController
 * Package: com.wallace.controller
 * Description:
 *
 * @Author yajuxi
 */
@RestController
@RequestMapping("search")
@CrossOrigin
public class SearchController {
    @Autowired
    private CkListService ckListService;
    /*
     * @Author yajuxi
     * @Description 根据header查找checklist返回集合
     * @Param [cid]
     * @return com.wallace.utils.Result
     **/
    @GetMapping("/{header}")
    public Result searchByHeader(@PathVariable(name = "header") String header){
        Result result = ckListService.searchByHeader(header);
        return result;
    }
}
