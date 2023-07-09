import React, { useState } from "react";
import "./index.css";
import {
  Layout,
  Divider,
  Table,
  Modal,
  Input,
  Form,
  Image,
  Select,
  Upload,
  Button,
  Radio,
  Space,
} from "antd";
import {
  DeleteFilled,
  EditTwoTone,
  EyeFilled,
  SearchOutlined,
  DownloadOutlined,
  PlusCircleFilled,
  RightCircleFilled,
  EditFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { RcFile, UploadProps } from "antd/es/upload";
import { UploadFile } from "antd/es/upload/interface";


const handleClick = () => {
  // Handle button click event here
  console.log("Button clicked!");
};


const App = () => {

  //customer table**********************************************************
//table head section---------------------------------------------


//part of the file uploading
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

//modal footer layour
const contentStyle = {
  minHeight: 10,
  backgroundColor: "#EAEAEA",
};
//******************************************** */


  const [selectionType, setSelectionType] = useState("checkbox");
  const { Search } = Input; //for srarch bar
  // const onSearch = (value: string) => console.log(value);

  const { Content } = Layout;
  const { Option } = Select; //customer type selection
  //responsive model
  const [open, setOpen] = useState(false); //to open the modle
  const [custometForm] = Form.useForm();

  //multiple file uploading **************************************************
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  //********************************************************************** */

  //to gender selector********************************
  const [gender, setGender] = useState();

  const onChange = (RadioChangeEvent) => {
    console.log("gender checked", RadioChangeEvent.target.value);
    setGender(RadioChangeEvent.target.value);
  };

  //add contact person data to the table****************************
  const[contact_name, setContact_name] = useState()
  const[contact_designation, setContact_designation] = useState()
  const[contact_mobile, setContact_mobile] = useState()
  const[contact_email, setContact_email] = useState()

  // const[displaycontact_name, setDisplayContact_name] = useState()
  // const[displaycontact_designation, setDisplayContact_designation] = useState()
  // const[displaycontact_mobile, setDisplayContact_mobile] = useState()
  // const[displaycontact_email, setDisplayContact_email] = useState()

  const [contactData, setContactData] = useState([]);
  
  //const [tableData, setTableData] = useState([])

  const handleAdd = (e) => {
    e.preventDefault();
    
    const newContact = {
      contact_name,
      contact_designation,
      contact_mobile,
      contact_email
    };

    setContactData((prevData) => [...prevData, newContact]);

    setContact_name("");
    setContact_designation("");
    setContact_mobile("");
    setContact_email("");
  };

  const handleChange1 = (e, fieldName) => {
    const value = e.target.value;
    switch (fieldName) {
      case "contact_name":
        setContact_name(value);
        break;
      case "contact_designation":
        setContact_designation(value);
        break;
      case "contact_mobile":
        setContact_mobile(value);
        break;
      case "contact_email":
        setContact_email(value);
        break;
      default:
        break;
    }
  };

  const ContactPersonData = contactData.map((contact, index) => ({
    key: index.toString(),
    ...contact
  }));

  const handlecontactdelete = () => {
    setContact_designation("")
    setContact_email("")
    setContact_mobile("");
    setContact_name("")
  }
  //delete operation for the contact person table
  const handleDeletecontact = (key) => {
    setContactData((prevData) =>
      prevData.filter((contact) => contact.key !== key)
    );
  };

  //contact person table data starts--------------------------------

  // const ContactPersonData = [
  //   {
  //     key: "1",
  //     contact_name: displaycontact_name,
  //     contact_designation: displaycontact_designation,
  //     contact_mobile: displaycontact_mobile,
  //     contact_email: displaycontact_email
  //   }
  // ];
//contact person table data end--------------------------------
  //************************************************** */

  const customerColumns = [
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Name",
      dataIndex: "customer_name",
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Mobile",
      dataIndex: "customer_mobile",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <>
            <EyeFilled 
              style={{ fontSize: "20px", color: "#5FC47B", marginRight: 10 }}
            />
            <EditFilled style={{ fontSize: "20px", marginRight: 10, color:"#00F3F6" }}/>
            <DeleteFilled style={{ fontSize: "20px", color: "#FF0000" }} />
          </>
        );
      },
      width: 120,
    },
  ];
  //table head section end--------------------------------------------------------
  
  //table data section start----------------------------------------------------------
  const customerData = [
    {
      key: "1",
      code: "RE00001",
      type: "Cash",
      customer_name: "Saman",
      customer_mobile: "0772785361",
      country: "Sri Lanka",
      city: "Colombo",
      gender: "Male",
    },
    {
      key: "1",
      code: "RE00002",
      type: "Card",
      customer_name: "Amila",
      customer_mobile: "0772785361",
      country: "Sri Lanka",
      city: "Rathmalana",
      gender: "Male",
    },
  ];
  //table data section end-------------------------------------------------
  
  //table row selection-------------------------------------------
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === "Disabled User",
    //   name: record.name,
    // }),
  };
  //----------------------------------------------------------------
  //customer table end***************************************************
  
  //contact person table ************************************************
  //table header----------------------------------------
  const ContactPersonColumns = [
    {
      title: "Name",
      dataIndex: "contact_name",
      key: "contact_name",
    },
    {
      title: "Designation",
      dataIndex: "contact_designation",
      key: "contact_designation",
      width:350
    },
    {
      title: "Mobile",
      dataIndex: "contact_mobile",
      key: "contact_mobile",
    },
    {
      title: "Email",
      dataIndex: "contact_email",
      key: "contact_email",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <>
          {/* onClick={() => handleDeletecontact(record.key)}  */}
            <EditFilled style={{ fontSize: "20px", marginRight: 10, color:"#00F3F6" }}/>
            <DeleteFilled  onClick={handlecontactdelete}
            style={{ fontSize: "20px", color: "#FF0000" }} />
          </>
        );
      },
      width: 100,
    },
  ];
  //table header end------------------------------------
  
  //contact person table end********************************************


  //** */

  return (
    <div style={{ margin: 20 }}>
      <div>
        {/* <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} /> */}
        <Input
          style={{
            width: 300,
            borderRadius: 50,
            marginTop: 20,
            marginBottom: 10,
          }}
          suffix={<SearchOutlined />}
          placeholder="Search"
        />
        <div style={{ position: "fixed", top: 50, right: 50 }}>
          <PlusCircleFilled
            onClick={() => setOpen(true)}
            style={{ color: "#00BE35", fontSize: "25px" }}
          />
          <DownloadOutlined style={{ marginLeft: 5, fontSize: "25px" }} />
        </div>
      </div>

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={customerColumns}
        dataSource={customerData}
        pagination={false}
      />

      <Modal
        title="CUSTOMER DETAILS:"
        centered
        open={open}
        onOk={() => setOpen(false)}
        // onCancel={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
        width="90%"
      >
        <Divider />
        <Form
          form={custometForm}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          width="90%"
        >
          {/* start of the form fields */}
          <div style={{ display: "flex", flex: 1 }}>
            <div style={{ margin: 10, flex: 1 }}>
              <Form.Item name="code" label={<span style={{ fontWeight: "bold" }}>Code:</span>} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="customer_name" label={<span style={{ fontWeight: "bold" }}>Customer Name:</span>}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ margin: 10, flex: 1 }}>
              <Form.Item
                name="reffrence_no"
                label={<span style={{ fontWeight: "bold" }}>Refrance No:</span>}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="company_name"
                label={<span style={{ fontWeight: "bold" }}>Company Name:</span>}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ margin: 10, flex: 1 }}>
              <Form.Item
                name="customertype"
                label={<span style={{ fontWeight: "bold" }}>Customer Type:</span>}
                rules={[{ required: true }]}
              >
                <Select placeholder="Select a option" allowClear>
                  <Option value="male">cache</Option>
                  <Option value="other">card</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="id"
                label={<span style={{ fontWeight: "bold" }}>NIC/Passport/Driver's License:</span>}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ margin: 10, flex: 1 }}>
              <Image
                flex="1"
                width="100%"
                height={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </div>
          </div>

          {/* starting from the 3rd row */}
          <div style={{ display: "flex", flex: 1 }}>
            <div style={{ margin: 10, flex: 2 }}>
              <Form.Item
                name="billing_address"
                label={<span style={{ fontWeight: "bold" }}>Billing Address:</span>}

                required={true}
              >
                <Input.TextArea />
              </Form.Item>
            </div>
            <div style={{ margin: 10, flex: 1 }}>
              <Form.Item
                name="customer_mobile"
                label={<span style={{ fontWeight: "bold" }}>Mobile Number:</span>}

                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="country"
                label={<span style={{ fontWeight: "bold" }}>Country:</span>}

                rules={[{ required: true }]}
              >
                <Select placeholder="Select a option" allowClear>
                  <Option value="srilanka">Sri Lanka</Option>
                  <Option value="canada">Canada</Option>
                  <Option value="india">India</Option>
                  <Option value="australia">Australia</Option>
                  <Option value="germany">Germany</Option>
                  <Option value="uganda">Uganda</Option>
                </Select>
              </Form.Item>
            </div>
            <div style={{ margin: 10, flex: 1 }}>
              <Form.Item
                name="customer_email"
                label={<span style={{ fontWeight: "bold" }}>Email:</span>}

                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="city" label={<span style={{ fontWeight: "bold" }}>City:</span>} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </div>
          </div>

          {/* starting from the 5th row */}
          <div style={{ display: "flex", flex: 1 }}>
            <div style={{ margin: 10, flex: 1 }}>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </div>
            <div style={{ margin: 10, flex: 1 }}>
              <Form.Item
                name="gender"
                label={<span style={{ fontWeight: "bold" }}>Gender:</span>}
                rules={[{ required: true }]}
              >
                <Radio.Group onChange={onChange} value={gender}>
                  <Radio value={1}><b>Male</b></Radio>
                  <Radio value={2}><b>Female</b></Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>

          <Divider />

          {/* new section */}
          <>
      <h2>Contact Person Details :</h2>

      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ margin: 10, flex: 1 }}>
          <Form.Item
            name="contact_name"
            label="Name:"
            rules={[{ required: true }]}
          >
            <Input
              value={contact_name}
              onChange={(e) => handleChange1(e, "contact_name")}
            />
          </Form.Item>
        </div>
        <div style={{ margin: 10, flex: 1 }}>
          <Form.Item
            name="contact_designation"
            label="Designation:"
            rules={[{ required: true }]}
          >
            <Input
              value={contact_designation}
              onChange={(e) => handleChange1(e, "contact_designation")}
            />
          </Form.Item>
        </div>
        <div style={{ margin: 10, flex: 1 }}>
          <Form.Item
            name="contact_mobile"
            label="Mobile:"
            rules={[{ required: true }]}
          >
            <Input
              value={contact_mobile}
              onChange={(e) => handleChange1(e, "contact_mobile")}
            />
          </Form.Item>
        </div>
        <div style={{ margin: 10, flex: 1 }}>
          <Form.Item
            name="contact_email"
            label="Email:"
            rules={[{ required: true }]}
            required
          >
            <Input
              value={contact_email}
              onChange={(e) => handleChange1(e, "contact_email")}
            />
          </Form.Item>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}>
          <div style={{ flex: 1 }}>
            <Button type="primary" onClick={handleAdd}>
              Add
            </Button>
          </div>
        </div>
      </div>
      <Table
        columns={ContactPersonColumns}
        dataSource={ContactPersonData}
        pagination={false}
      />
    </>
        <Layout>
          <Content style={contentStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                // marginTop: 5,
              }}
            >
              <div>
                <Button style={{ width: 100, margin: 5 }}>Clear</Button>
                <Button
                  style={{ width: 100, backgroundColor: "#00C136", margin: 5 }}
                >
                  Save
                </Button>
              </div>
            </div>
          </Content>
        </Layout>
        </Form>
      </Modal>
    </div>
  );
};
export default App;
