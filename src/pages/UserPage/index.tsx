import React, {ReactElement, useEffect, useState} from "react"
import { GetManyProxy } from "../../models/proxies/get-many.proxies";
import { UserProxy } from "../../models/proxies/user.proxies";
import { deleteUser, getUsers } from "../../services/user";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Button, Card, Input, Popconfirm, Space, Spin, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


export function ListUser(): ReactElement{
    const [users, setUsers] = useState<GetManyProxy<UserProxy>>();
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [isLoading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    

    function fetchData(){
        setLoading(true)


        getUsers(search, page)
            .then(data => setUsers(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    useEffect(() => fetchData(), [search, page])

    function deleteLine(id: number){
        setLoading(true);

        deleteUser(id)
        .then(() => console.log("Foi embora com deus"))
        .catch(error => console.log(error))
        .finally(() => fetchData());
    }


    const columns: ColumnsType<UserProxy> = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name'
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email'
        },
        {
            key: 'actions',
            align: 'right',
            width: '10%',
            render: (_, user) => (
                <Space>
                    <Tooltip title="Edit" placement="bottom">
                    <Button icon={<EditOutlined/>} onClick = {() => navigate('/')}/>
                    
                    </Tooltip>
                    <Popconfirm title="Remove line?" onConfirm={() => deleteLine(user.id)} placement="topRight">
                        <Tooltip title="Remove" placement="bottom">
                            <Button icon={<DeleteOutlined/>} danger/>
                        </Tooltip>
                    </Popconfirm>
                </Space>
            )
        }
    ];
    const pagination: TablePaginationConfig= {
        current: users?.current_page,
        pageSize: users?.per_number,
        total: users?.total,
        onChange: (page) => setPage(page),
    }
    return (
            <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                <Input.Search
                placeholder="Seach an user..."
                size="large"
                onSearch={(value) => setSearch(value)}
                enterButton
                />
                <Button size="large" onClick={() => navigate('/addUser')}>Insert New User</Button>
                <Card bodyStyle={{padding: 0}}>
                    <Spin spinning={isLoading}>
                        <Table
                        columns={columns}
                        dataSource={users?.data || []}
                        pagination={pagination}
                        />
                    </Spin>
                </Card>
            </Space>
    )
}