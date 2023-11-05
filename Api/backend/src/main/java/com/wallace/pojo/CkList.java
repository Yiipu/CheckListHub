package com.wallace.pojo;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import lombok.Data;

/**
 * @TableName ck_list
 */
@TableName(value ="ck_list")
@Data
public class CkList implements Serializable {
    @TableId
    private Integer cid;

    private Integer uid;

    private String header;

    private Object checklist;
    @Version
    private Integer version;
    @TableLogic
    private Integer isDeleted;

    private static final long serialVersionUID = 1L;
}