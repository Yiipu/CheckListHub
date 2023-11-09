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
    public Result CreateTeam(@RequestHeader("uid") Integer uid, @RequestHeader("cid") Integer cid) {
        // 创建合作progreess
        Result result = progressService.CreateTeamProgress(uid, cid);
        // 加入teamcollection
        collectionToChecklistService.putTeam(cid, uid);
        return result;
    }

    @GetMapping("/{tid}")
    public Result AddTeam(@RequestHeader("uid") Integer uid, @PathVariable(name = "tid") Integer tid) {
        // 查询cid
        Integer cid = progressService.findCidByTid(tid);
        // 加入合作progreess
        Result result = progressService.addTeamProgress(tid, uid, cid);
        // 加入teamcollection
        collectionToChecklistService.putTeam(cid, uid);
        return Result.ok(cid);
    }

    @GetMapping("/delete/{tid}")
    public Result QuitTeam(@RequestHeader("uid") Integer uid, @RequestHeader("cid") Integer cid, @PathVariable(name = "tid") Integer tid) {
        // 退出合作progreess
        Result result = progressService.QuitTeamProgress(tid, uid, cid);
        // 清除teamcollection
        collectionToChecklistService.deleteTeam(cid, uid);
        return result;
    }
}
