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
import com.wallace.pojo.Progress;
import com.wallace.service.CkListService;
import com.wallace.service.CollectionToChecklistService;
import com.wallace.service.ProgressService;
import com.wallace.service.UserService;
import com.wallace.utils.Result;
import com.wallace.utils.StringToArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public Result findCkByCid(@PathVariable(name = "cid") Integer cid, @RequestHeader(name = "uid", required = false) Integer uid, @RequestHeader(name = "tid", required = false) Integer tid) {
        if (tid == null)
            tid = 0;
        if (ckListService.CidExisted(cid)) {
            if(uid==null){
                Result result = ckListService.selectBycid(cid);
                return result;
            }

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


    /*
     * @Author yajuxi
     * @Description 添加收藏
     * @Param [cid, uid]
     * @return com.wallace.utils.Result
     **/
    @GetMapping("/favor/put/{cid}")
    public Result putFavor(@PathVariable(name = "cid") Integer cid, @RequestHeader("uid") Integer uid) {
        Result result = collectionToChecklistService.putFavor(cid, uid);
        return result;
    }

    /*
     * @Author yajuxi
     * @Description 删除收藏
     * @Param [cid, uid]
     * @return com.wallace.utils.Result
     **/
    @GetMapping("/favor/delete/{cid}")
    public Result deleteFavor(@PathVariable(name = "cid") Integer cid, @RequestHeader("uid") Integer uid) {
        Result result = collectionToChecklistService.deleteFavor(cid, uid);
        return result;
    }

    /*
     * @Author yajuxi
     * @Description 查询是否为收藏
     * @Param [cid, uid]
     * @return com.wallace.utils.Result
     **/
    @GetMapping("/favor/{cid}")
    public Result searchFavor(@PathVariable(name = "cid") Integer cid, @RequestHeader("uid") Integer uid) {
        Result result = collectionToChecklistService.searchFavor(cid, uid);
        return result;
    }

    /*
     * @Author yajuxi
     * @Description 保存check项的√，更新数据库progress
     * @Param [cid, uid, tid]
     * @return com.wallace.utils.Result
     **/
    @PostMapping("/progress/{cid}")
    public Result updateProgress(@PathVariable(name = "cid") Integer cid, @RequestHeader("uid") Integer uid, @RequestHeader(name = "tid", required = false) Integer tid, @RequestBody List<Boolean> p) {
        String progress = StringToArray.booleanListToString(p);
        if (tid == null)
            tid = 0;
        if (ckListService.CidExisted(cid)) {
            // 更新progress表
            Result result = progressService.updateprogress(tid, uid, cid, progress);

            return result;
        } else return Result.build(returnEmpty, 404, progress);
    }


}
