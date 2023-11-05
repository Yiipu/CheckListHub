package com.wallace.pojo;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * @TableName ck_list_collection
 */
@TableName(value ="ck_list_collection")
@Data
public class CkListCollection implements Serializable {
    @TableId
    private Integer colid;

    private Integer cid;

    private Integer uid;

    private Date viewTime;

    private Integer isTeam;
    @Version
    private Integer version;
    @TableLogic
    private Integer isDeleted;

    private static final long serialVersionUID = 1L;
}