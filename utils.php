<?php
    function connect_mysql(){
        $con = mysql_connect('localhost', 'motocal', '66t7qsA2') or die('Error!(mysql connect)');
        mysql_select_db('motocaldb', $con) or die('Error!(select db)');
        return $con;
    }

    function delete_by_id($table_name, $id, $con){
        $query = "delete from $table_name where id=$id;";
        return do_query($query, $con);
    }

    function insert_into($table_name, $value, $con){
        $created = date("Y-m-d H:i:s");
        $hashtext = md5($value);
        $query = "insert into $table_name(datachar, hashtext, created, lastaccessed) values ('$value', '$hashtext', '$created', '$created')";
        $res = do_query($query, $con);

        if(strpos($res, 'Duplicate entry') !== false){
            // md5での検索は上手くいかない？？？
            $id = select_by_hash($table_name, $hashtext, $con);
            $id = $id["id"];
        } else {
            $id = mysql_insert_id();
        }

        return $id;
    }

    function update_lastaccessed($table_name, $id, $con){
        $now = date("Y-m-d H:i:s");
        $query = "update $table_name set lastaccessed = '$now' where id = $id";
        do_query($query, $con);
        return 0;
    }

    function select_all_and_echo($table_name, $limit, $offset, $con){
        $query = "select * from $table_name ORDER BY id DESC LIMIT $limit OFFSET $offset";
        $res = do_query($query, $con);
        $arr = array();
        while($row = mysql_fetch_assoc($res)) {
            $arr[] = $row;
        }
        return $arr;
    }

    function select_by_hash($table_name, $hash, $con){
        $query = "select * from $table_name where hashtext='$hash'";
        $res = do_query($query, $con);

        return mysql_fetch_assoc($res);
    }

    function select_by_id($table_name, $id, $con){
        $query = "select * from $table_name where id=$id";
        $res = do_query($query, $con);

        return mysql_fetch_assoc($res);
    }

    function get_count($table_name, $con){
        $query = "select max(id) from $table_name";
        $res = do_query($query, $con);

        return mysql_result($res, 0);
        }

    function get_record_count($table_name, $con){
        $query = "select count(id) from $table_name";
        $res = do_query($query, $con);

        return mysql_result($res, 0);
    }

    function do_query($query, $con){
        $res = mysql_query($query, $con);
        if(!$res){
            $res = "Error: ".mysql_error();
        }

        return $res;
    }
?>
