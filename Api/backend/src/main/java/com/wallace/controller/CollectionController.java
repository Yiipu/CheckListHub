package com.wallace.controller;

import com.wallace.service.ListcollectionService;
import com.wallace.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
