package com.wallace.pojo.VO;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.Version;
import com.wallace.pojo.CkList;
import com.wallace.utils.JsonTypeHandler;
import lombok.Data;

import java.io.Serializable;

/**
 * ClassName: CkListView
 * Package: com.wallace.service.impl.VO
 * Description:
 *
 * @Author yajuxi
 */
@Data
public class CkListView{
    private Integer cid;

    private Integer uid;

    private String header;

    private JSONObject checklist;

    private Integer version;

    private Integer isDeleted;

    // 新增的成员变量 progress
    private String progress;

    public CkListView(CkList ck, String progress){
        this.setUid(ck.getUid());
        this.setCid(ck.getCid());
        this.setHeader(ck.getHeader());
        this.setChecklist(ck.getChecklist());
        this.setVersion(ck.getVersion());
        this.setIsDeleted(ck.getIsDeleted());
        this.setProgress(progress);
    }


}
