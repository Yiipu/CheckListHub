package com.wallace.pojo;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;

import com.wallace.utils.JsonTypeHandler;
import lombok.Data;

/**
 * @TableName ck_list
 */
@TableName(value = "ck_list", autoResultMap = true)
@Data
public class CkList implements Serializable {
    @TableId
    private Integer cid;

    private Integer uid;

    private String header;
    @TableField(typeHandler = JsonTypeHandler.class)
    private JSONObject checklist;
    @Version
    private Integer version;
    @TableLogic
    private Integer isDeleted;

    private static final long serialVersionUID = 1L;
}