package com.wallace.controller;

/**
 * ClassName: CkListController
 * Package: com.wallace.controller
 * Description: checklist控制层
 *
 * @Author yajuxi
 */

import com.wallace.pojo.CkList;
import com.wallace.pojo.CollectionToChecklist;
import com.wallace.service.CkListService;
import com.wallace.service.CollectionToChecklistService;
import com.wallace.service.ProgressService;
import com.wallace.service.UserService;
import com.wallace.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("checklist")
@CrossOrigin
public class CkListController {
    String[] returnEmpty = new String[0];
    @Autowired
    private CkListService ckListService;

    @Autowired
    private CollectionToChecklistService collectionToChecklistService;

    @Autowired
    private ProgressService progressService;

    /*
     * @Author yajuxi
     * @Description 根据cid查找checklist
     * @Param [cid]
     * @return com.wallace.utils.Result
     **/
    @GetMapping("/{cid}")
    public Result findCkByCid(@PathVariable(name = "cid") Integer cid, @RequestHeader("uid") Integer uid, @RequestHeader(name = "tid", required = false) Integer tid) {
        if (tid == null)
            tid = 0;
        if (ckListService.CidExisted(cid)) {

            // 更新最近浏览表
            Result r1 = collectionToChecklistService.updateRecent(cid, uid);
            // 创建progress表
            Result r2 = progressService.updateprogress(tid, uid, cid, null);

            Result result = ckListService.findByCid(tid, cid, uid);

            return result;
        } else return Result.build(returnEmpty, 404, "请求的checklist不存在");
    }


    /*
     * @Author yajuxi
     * @Description 导入初始checklist
     * @Param [cid]
     * @return com.wallace.utils.Result
     **/
    @GetMapping("/init")
    public Result insertByInit() {
        Result result = ckListService.insertByInit();
        return result;
    }

    @GetMapping("/favor/put/{cid}")
    public Result putFavor(@PathVariable(name = "cid") Integer cid, @RequestHeader("uid") Integer uid) {
        Result result = collectionToChecklistService.putFavor(cid, uid);
        return result;
    }

    @GetMapping("/favor/delete/{cid}")
    public Result deleteFavor(@PathVariable(name = "cid") Integer cid, @RequestHeader("uid") Integer uid) {
        Result result = collectionToChecklistService.deleteFavor(cid, uid);
        return result;
    }

    @GetMapping("/favor/{cid}")
    public Result searchFavor(@PathVariable(name = "cid") Integer cid, @RequestHeader("uid") Integer uid) {
        Result result = collectionToChecklistService.searchFavor(cid, uid);
        return result;
    }


}
