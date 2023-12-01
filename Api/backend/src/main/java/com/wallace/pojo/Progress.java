package com.wallace.pojo;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import lombok.Data;

/**
 * @TableName progress
 */
@TableName(value ="progress")
@Data
public class Progress implements Serializable {
    @TableId
    private Integer id;

    private Integer tid;

    private Integer uid;

    private Integer cid;

    private String mark;

    @Version
    private Integer version;
    @TableLogic
    private Integer isDeleted;

    private static final long serialVersionUID = 1L;
}