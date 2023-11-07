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
@RequestMapping("checklist")
@CrossOrigin
public class CkListController {
    @Autowired
    private CkListService ckListService;
    /*
     * @Author yajuxi
     * @Description 根据cid查找checklist
     * @Param [cid]
     * @return com.wallace.utils.Result
     **/
    @GetMapping("/{cid}")
    public Result findCkByCid(@PathVariable(name = "cid") Integer cid){
        Result result = ckListService.findByCid(cid);
        return result;
    }


    /*
     * @Author yajuxi
     * @Description 导入初始checklist
     * @Param [cid]
     * @return com.wallace.utils.Result
     **/
    @GetMapping("/init")
    public Result insertByInit(){
        Result result = ckListService.insertByInit();
        return result;
    }


}
