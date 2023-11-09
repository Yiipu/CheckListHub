package com.wallace.controller;

import com.wallace.service.ListcollectionService;
import com.wallace.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * ClassName: CollectionController
 * Package: com.wallace.controller
 * Description: Collection controller层
 *
 * @Author yajuxi
 */
@RestController
@RequestMapping("collection")
@CrossOrigin
public class CollectionController {
    @Autowired
    private ListcollectionService listcollectionService;
    @GetMapping("/init")
    public Result insertByInit(){
        Result result = listcollectionService.insertByInit();
        return result;
    }

    @GetMapping("/best")
    public Result findBest(){
        Result result = listcollectionService.findBest();
        return result;
    }

    @GetMapping("/favor")
    public Result findFavor(@RequestHeader("x-ms-client-principal-id") Integer uid){
        Result result = listcollectionService.findFavor(uid);
        return result;
    }

    @GetMapping("/recent")
    public Result findRecent(@RequestHeader("x-ms-client-principal-id") Integer uid){
        Result result = listcollectionService.findRecent(uid);
        return result;
    }

}
