package com.wallace.controller;

import com.wallace.pojo.Progress;
import com.wallace.service.CollectionToChecklistService;
import com.wallace.service.ProgressService;
import com.wallace.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private ProgressService progressService;
    @Autowired
    private CollectionToChecklistService collectionToChecklistService;

    @GetMapping("")
    public Result CreateTeam(@RequestHeader("uid") Integer uid,@RequestHeader("cid") Integer cid){
        // 加入合作progreess
        Result result = progressService.CreateTeamProgress(uid,cid);
        return result;
    }
}
