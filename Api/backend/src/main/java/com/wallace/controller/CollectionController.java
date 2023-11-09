package com.wallace.controller;

import com.wallace.pojo.CollectionToChecklist;
import com.wallace.service.CollectionToChecklistService;
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
    @Autowired
    private CollectionToChecklistService collectionToChecklistService;

    /*
     * @Author yajuxi
     * @Description Best集合初始化（测试）
     * @Param []
     * @return com.wallace.utils.Result
     **/
    @GetMapping("/init")
    public Result insertByInit() {
        Result result = collectionToChecklistService.insertByInit();
        return result;
    }
    /*
     * @Author yajuxi
     * @Description 查询best集合
     * @Param
     * @return
     **/

    @GetMapping("/best")
    public Result findBest() {
        Result result = listcollectionService.findBest();
        return result;
    }
    /*
     * @Author yajuxi
     * @Description 查询收藏集合
     * @Param
     * @return
     **/

    @GetMapping("/favor")
    public Result findFavor(@RequestHeader("uid") Integer uid) {
        Result result = listcollectionService.findFavor(uid);
        return result;
    }

    /*
     * @Author yajuxi
     * @Description 查询最近浏览集合
     * @Param [uid]
     * @return com.wallace.utils.Result
     **/
    @GetMapping("/recent")
    public Result findRecent(@RequestHeader("uid") Integer uid) {
        Result result = listcollectionService.findRecent(uid);
        return result;
    }
    /*
     * @Author yajuxi
     * @Description 查询团队合作集合
     * @Param
     * @return 
     **/

    @GetMapping("/team")
    public Result findTeam(@RequestHeader("uid") Integer uid) {
        Result result = listcollectionService.findTeam(uid);
        return result;
    }

}
