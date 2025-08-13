// import { useCallback, useContext, useEffect, useState } from "react";
// import { IconButton, Link as MLink, Tab, Tabs } from "@mui/material";
// import styles from "./Test.module.scss";
// import { Button } from "antd";
// import { CustomTable, Modal, Sidebar } from "../../components";
// import { TestContext, useTestContext } from "../../utils/contexts/TestContext";
// import { Error } from "../";
// import { useNavigate } from "react-router";
// import MainLayout from "../../layouts/MainLayout";
// import { Add as AddIcon, DeleteForever } from "@mui/icons-material";
// import { AuthContext } from "./../../utils/auth/AuthContext";
// import { Tag, message } from "antd";
// import { Link } from "react-router-dom";
// import CustomPopConfirm from "../../components/PopConfirm/CustomPopConfirm";
// import { API_TESTS } from "../../utils/api/config";
// import dayjs from "dayjs";
// import { CopyOutlined } from "@ant-design/icons";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// interface DataType {
//   key: React.Key;
//   id: string;
//   name: string;
//   exam: string;
//   createdAt: string;
//   status: string;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && children}
//     </div>
//   );
// }

// const Test = () => {
//   function getColorByStatus(status: string) {
//     return status === "Ongoing"
//       ? "green"
//       : status === "Active"
//       ? "yellow"
//       : "red";
//   }

//   async function handleDeleteTest(testId: string) {
//     console.log(testId);
//     try {
//       message.loading("Deleting Test", 1);
//       const res = await API_TESTS().delete("test/delete/" + testId);
//       setData(data.filter((test: any) => test._id !== testId));
//       message.destroy(1);
//       message.success("Deleted Successfully");
//     } catch (error) {
//       message.destroy(1);
//       message.error("Some Error Occured");
//     }
//   }
//   const isTestComplete = (test: any): boolean => {
//   let isComplete = true;
  
//   test.sections?.forEach((section: any) => {
//     section.subSections?.forEach((subSection: any) => {
//       if (!subSection?.questions || 
//           subSection.questions.length !== subSection.totalQuestions) {
//         isComplete = false;
//       }
//     });
//   });
  
//   return isComplete;
// };

// async function handleActivateTest(testId: string) {
//   try {
//     const loading = message.loading("Activating Test...", 0);
//     const res = await API_TESTS().patch(`/test/update`, {
//       id: testId,
//       status: "Active",
//       modifiedAt: new Date().toISOString()
//     });
//     loading();
//     message.success("Test Activated Successfully");
    
//     // Refresh the data
//     handleChangeTab(null, tab);
//   } catch (error: any) {
//     message.error(error?.response?.data?.message || "Failed to activate test");
//   }
// }

// async function handleReuseTest(testId: string) {
//   try {
//     const loading = message.loading("Creating duplicate test...", 0);
    
//     // Fetch the full test data
//     const testData = await fetchTestByID(testId);
    
//     // Create a new test with same data but new ID and dates
//     const newTest = {
//       ...testData.data,
//       id: undefined,
//       _id: undefined,
//       name: `${testData.data.name} - Copy`,
//       status: "Inactive",
//       validity: {
//         from: "",
//         to: ""
//       },
//       createdAt: new Date().toISOString(),
//       modifiedAt: new Date().toISOString(),
//       result: {
//         ...testData.data.result,
//         students: [],
//         publishProps: {
//           ...testData.data.result.publishProps,
//           isPublished: false,
//           publishDate: null
//         }
//       }
//     };
    
//     const res = await API_TESTS().post(`/test/create`, newTest);
//     loading();
//     message.success("Test duplicated successfully. Redirecting to edit...");
    
//     // Navigate to edit the new test
//     setTimeout(() => {
//       navigate(`/test/edit/${res.data._id}`);
//     }, 1000);
    
//   } catch (error: any) {
//     message.error(error?.response?.data?.message || "Failed to reuse test");
//   }
// }
//   const { exams } = useContext(TestContext);

//   const [columns, setColumns] = useState<any>([
//     {
//       title: "ID",
//       dataIndex: "_id",
//       width: 100,
//       fixed: "left",
//       render: (text: string) => (
//         <span
//           style={{
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             whiteSpace: "nowrap",
//             width: "100%",
//             display: "inline-block",
//           }}
//         >
//           {text}
//         </span>
//       ),
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       width: 150,
//       searchable: true,
//       fixed: "left",
//       render: (name: string, row: any) => (
//         <Link to={`/test/edit/${row._id}`}>
//           <MLink className={styles.ellipsis}>{name}</MLink>
//         </Link>
//       ),
//     },
//     {
//       title: "Exam",
//       dataIndex: "exam",
//       width: 150,
//       filters: exams?.map((exam: any) => ({
//         text: exam.name,
//         value: exam.name,
//       })),
//       onFilter: (value: any, record: any) =>
//         record.exam.name.indexOf(value) == 0,
//       render: (exam: any) => (
//         <span
//           style={{
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             whiteSpace: "nowrap",
//             width: "100%",
//             display: "inline-block",
//           }}
//         >
//           {exam.name}
//         </span>
//       ),
//     },
//     {
//       title: "Created",
//       dataIndex: "createdAt",
//       width: 200,
//       render: (date: string) => new Date(date).toDateString(),
//       sorter: (a: any, b: any) =>
//         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
//     },
//     {
//       title: "Duration(min)",
//       dataIndex: "durationInMinutes",
//       width: 160,
//       defaultSortOrder: "descend",
//       sorter: (a: any, b: any) => a.durationInMinutes - b.durationInMinutes,
//     },
//     {
//       title: "Start Time",
//       width: 150,
//       render: (row: any) => new Date(row.validity.from).toLocaleString(),
//       defaultSortOrder: "descend",
//       sorter: (a: any, b: any) =>
//         new Date(a.validity.from).getTime() -
//         new Date(b.validity.from).getTime(),
//     },
//     {
//       title: "End Time",
//       width: 150,
//       render: (row: any) => new Date(row.validity.to).toLocaleString(),
//       defaultSortOrder: "descend",
//       sorter: (a: any, b: any) =>
//         new Date(a.validity.to).getTime() - new Date(b.validity.to).getTime(),
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       width: 100,
//       render: (status: string) => (
//         <Tag color={getColorByStatus(status)}>{status}</Tag>
//       ),
//     },
//     // {
//     //   title: "Actions",
//     //   fixed: "right",
//     //   width: 150,
//     //   render: (row: any) => {
//     //     // console.log({ row });
//     //     if (
//     //       (row?.result?.publishProps?.type === "immediately" ||
//     //         row?.result?.publishProps?.isPublished) &&
//     //       row?.status !== "Active"
//     //     ) {
//     //       return (
//     //         <div className={styles.flexRow}>
//     //           <Button
//     //             onClick={() => {
//     //               console.log({ row });
//     //               navigate(
//     //                 `/test/result/${row.name}/${row.exam.name}/${row._id}`
//     //               );
//     //             }}
//     //           >
//     //             View Result
//     //           </Button>
//     //           <CustomPopConfirm
//     //             title="Are you sure to delete Test?"
//     //             onConfirm={() => {
//     //               handleDeleteTest(row._id);
//     //             }}
//     //             cancelText="Cancel"
//     //             okText="Yes, Delete"
//     //           >
//     //             <IconButton>
//     //               <DeleteForever />
//     //             </IconButton>
//     //           </CustomPopConfirm>
//     //         </div>
//     //       );
//     //     } else {
//     //       return (
//     //         <div className={styles.flexRow}>
//     //           <p>No Result</p>
//     //           <CustomPopConfirm
//     //             title="Are you sure to delete Test?"
//     //             onConfirm={() => {
//     //               handleDeleteTest(row._id);
//     //             }}
//     //             cancelText="Cancel"
//     //             okText="Yes, Delete"
//     //           >
//     //             <IconButton>
//     //               <DeleteForever />
//     //             </IconButton>
//     //           </CustomPopConfirm>
//     //         </div>
//     //       );
//     //     }
//     //   },
//     // },
//   {
//   title: "Actions",
//   fixed: "right",
//   width: 200,
//   render: (row: any) => {
//     console.log("current tab:", tab);
//     const testComplete = isTestComplete(row);
//     // console.log("current tab:" tab);
//     // For Inactive Tests (tab === 1)
//     if (tab === 1) {
//       return (
//         <div className={styles.flexRow}>
//           <Tag color={testComplete ? "green" : "orange"}>
//             {testComplete ? "Complete" : "Incomplete"}
//           </Tag>
//           {testComplete && (
//             <Button 
//               type="primary"
//               onClick={() => handleActivateTest(row._id)}
//             >
//               Activate Test
//             </Button>
//           )}
//           <CustomPopConfirm
//             title="Are you sure to delete Test?"
//             onConfirm={() => handleDeleteTest(row._id)}
//             cancelText="Cancel"
//             okText="Yes, Delete"
//           >
//             <IconButton>
//               <DeleteForever />
//             </IconButton>
//           </CustomPopConfirm>
//         </div>
//       );
//     }
    
//     // For Expired Tests (tab === 4)
//     if (tab === 4) {
//       return (
//         <div className={styles.flexRow}>
//           {(row?.result?.publishProps?.type === "immediately" ||
//             row?.result?.publishProps?.isPublished) && (
//             <Button
//               onClick={() => {
//                 navigate(
//                   `/test/result/${row.name}/${row.exam.name}/${row._id}`
//                 );
//               }}
//             >
//               View Result
//             </Button>
//           )}
//           <Button
//             type="default"
//             onClick={() => handleReuseTest(row._id)}
//             icon={<CopyOutlined />}
//           >
//             Reuse Test
//           </Button>
//           <CustomPopConfirm
//             title="Are you sure to delete Test?"
//             onConfirm={() => handleDeleteTest(row._id)}
//             cancelText="Cancel"
//             okText="Yes, Delete"
//           >
//             <IconButton>
//               <DeleteForever />
//             </IconButton>
//           </CustomPopConfirm>
//         </div>
//       );
//     }
    
//     // Default behavior for other tabs (Active, Ongoing, Upcoming)
//     if ((row?.result?.publishProps?.type === "immediately" ||
//          row?.result?.publishProps?.isPublished) &&
//         row?.status !== "Active") {
//       return (
//         <div className={styles.flexRow}>
//           <Button
//             onClick={() => {
//               navigate(
//                 `/test/result/${row.name}/${row.exam.name}/${row._id}`
//               );
//             }}
//           >
//             View Result
//           </Button>
//           <CustomPopConfirm
//             title="Are you sure to delete Test?"
//             onConfirm={() => handleDeleteTest(row._id)}
//             cancelText="Cancel"
//             okText="Yes, Delete"
//           >
//             <IconButton>
//               <DeleteForever />
//             </IconButton>
//           </CustomPopConfirm>
//         </div>
//       );
//     } else {
//       return (
//         <div className={styles.flexRow}>
//           <p>Result Not Published yet</p>
//           <CustomPopConfirm
//             title="Are you sure to delete Test?"
//             onConfirm={() => handleDeleteTest(row._id)}
//             cancelText="Cancel"
//             okText="Yes, Delete"
//           >
//             <IconButton>
//               <DeleteForever />
//             </IconButton>
//           </CustomPopConfirm>
//         </div>
//       );
//     }
//   },
// },
//   ]);

//   // Transfered above code from above the component to its inside to use navigate funtion inside colums array

//   const [tab, setTab] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [openModal, setOpenModal] = useState(false);

//   const navigate = useNavigate();

//   const [data, setData] = useState<any>([]);

//   const { state, fetchTest , fetchTestByID } = useTestContext();
//   const userCtx = useContext(AuthContext);
//   // console.log(userCtx);
//   const roles = userCtx?.roles;
//   let permissions: any = [];
//   Object.values(roles).map(
//     (role: any) => (permissions = [...permissions, ...role.permissions])
//   );
//   // console.log(permissions);
//   const { ongoingTests, activeTests, inactiveTests, expiredTests } = state;
//   function getStatus(validity: any) {
//     const testDateRange = [dayjs(validity.from), dayjs(validity.to)];
//     if (testDateRange[0] && testDateRange[1]) {
//       if (dayjs().isBefore(testDateRange[0])) {
//         return "Upcoming";
//       }
//       if (dayjs().isAfter(testDateRange[1])) {
//         return "Expired";
//       }
//       return "Ongoing";
//     }
//     return "Active";
//   }
//   function handleChangeTab(event: React.ChangeEvent<{}> | null, newValue: number) {
//     setTab(newValue);
//     console.log(newValue);
//     switch (newValue) {
//       case 0:
//         setData([]);
//         setLoading(true);
//         fetchTest("active", false, (error, result: any[]) => {
//           if (error) console.log(error);
//           setLoading(false);
//           setData(
//             result?.map((test: any) => ({
//               ...test,
//               key: test.id,
//               id: test.id,
//               name: test.name,
//               createdAt: test.createdAt,
//               status: test.status,
//               exam: test.exam,
//             }))
//           );
//         });
//         break;
//       case 1:
//         setData([]);
//         setLoading(true);
//         fetchTest("inactive", false, (error, result: any[]) => {
//           if (error) console.log(error);
//           setLoading(false);
//           setData(
//             result?.map((test: any) => ({
//               ...test,
//               key: test.id,
//               id: test.id,
//               name: test.name,
//               createdAt: test.createdAt,
//               status: test.status,
//               exam: test.exam,
//             }))
//           );
//         });
//         break;
//       case 2:
//         setData([]);
//         setLoading(true);
//         fetchTest("active", false, (error, result: any[]) => {
//           if (error) console.log(error);
//           //ongoing
//           setLoading(false);
//           console.log(
//             result,
//             result?.filter((t) => {
//               console.log(t.validity, getStatus(t.validity));
//               return getStatus(t.validity) === "Ongoing";
//             })
//           );
//           setData(
//             result
//               ?.filter((t) => {
//                 return getStatus(t.validity) === "Ongoing";
//               })
//               ?.map((test: any) => ({
//                 ...test,
//                 key: test.id,
//                 id: test.id,
//                 name: test.name,
//                 createdAt: test.createdAt,
//                 status: "Ongoing",
//                 exam: test.exam,
//               }))
//           );
//         });
//         break;

//       case 3:
//         setData([]);
//         setLoading(true);
//         fetchTest("active", false, (error, result: any[]) => {
//           if (error) console.log(error);
//           //upcomg
//           setLoading(false);
//           setData(
//             result
//               ?.filter((t) => {
//                 return getStatus(t.validity) === "Upcoming";
//               })
//               ?.map((test: any) => ({
//                 ...test,
//                 key: test.id,
//                 id: test.id,
//                 name: test.name,
//                 createdAt: test.createdAt,
//                 status: "Upcoming",
//                 exam: test.exam,
//               }))
//           );
//         });
//         break;
//       case 4:
//         setData([]);
//         setLoading(true);
//         fetchTest("active", false, (error, result: any[]) => {
//           if (error) console.log(error);
//           console.log(
//             result,
//             result?.filter((t) => {
//               console.log(t.validity, getStatus(t.validity));
//               return getStatus(t.validity) === "Expired";
//             })
//           );
//           //expired
//           setLoading(false);
//           setData(
//             result
//               ?.filter((t) => {
//                 return getStatus(t.validity) === "Expired";
//               })
//               ?.map((test: any) => ({
//                 ...test,
//                 key: test.id,
//                 id: test.id,
//                 name: test.name,
//                 createdAt: test.createdAt,
//                 status: "Expired",
//                 exam: test.exam,
//               }))
//           );
//         });
//         break;

//       default:
//         break;
//     }
//   }
//   const { currentUser } = useContext(AuthContext);

//   useEffect(() => {
//     setLoading(true);
//     if (fetchTest)
//       fetchTest("active", false, (error, result) => {
//         setData(
//           result?.map((test: any) => ({
//             ...test,
//             key: test.id,
//             id: test.id,
//             name: test.name,
//             createdAt: test.createdAt,
//             status: test.status,
//             exam: test.exam,
//           }))
//         );
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <MainLayout
//       name="Test"
//       menuActions={
//         permissions.find((value: string) => value === "CREATE_TEST") && (
//           <Button
//             type="primary"
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//             onClick={() => navigate("/test/new")}
//             icon={<AddIcon />}
//           >
//             Add New
//           </Button>
//         )
//       }
//     >
//       {currentUser?.userType != "student" ? (
//         <div className={styles.container}>
//           <div className={styles.header}>
//             <Tabs value={tab} onChange={handleChangeTab}>
//               <Tab label="Active" />
//               <Tab label="Inactive" />
//               <Tab label="Ongoing" />
//               <Tab label="Upcoming" />
//               <Tab label="Expired" />
//             </Tabs>
//           </div>
//           {[...Array(5)].map((_, index) => (
//             <TabPanel value={tab} index={index}>
//               <div className={styles.data}>
//                 <CustomTable
//                   loading={loading}
//                   selectable={false}
//                   columns={columns}
//                   dataSource={data}
//                   scroll={{ x: 600, y: 500 }}
//                 />
//               </div>
//             </TabPanel>
//           ))}

//           {/* <Sidebar title="Recent Activity">Recent</Sidebar> */}
//           <Modal
//             isOpen={openModal}
//             onClose={() => setOpenModal(false)}
//             title="CreateTest"
//             backdrop
//           >
//             Content
//           </Modal>
//         </div>
//       ) : (
//         <Error />
//       )}
//     </MainLayout>
//   );
// };

// export default Test;


import { useCallback, useContext, useEffect, useState, useMemo } from "react";
import { IconButton, Link as MLink, Tab, Tabs } from "@mui/material";
import styles from "./Test.module.scss";
import { Button } from "antd";
import { CustomTable, Modal, Sidebar } from "../../components";
import { TestContext, useTestContext } from "../../utils/contexts/TestContext";
import { Error } from "../";
import { useNavigate } from "react-router";
import MainLayout from "../../layouts/MainLayout";
import { Add as AddIcon, DeleteForever } from "@mui/icons-material";
import { AuthContext } from "./../../utils/auth/AuthContext";
import { Tag, message } from "antd";
import { Link } from "react-router-dom";
import CustomPopConfirm from "../../components/PopConfirm/CustomPopConfirm";
import { API_TESTS } from "../../utils/api/config";
import dayjs from "dayjs";
import { CopyOutlined } from "@ant-design/icons";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  exam: string;
  createdAt: string;
  status: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const Test = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<any>([]);

  const { state, fetchTest, fetchTestByID } = useTestContext();
  const userCtx = useContext(AuthContext);
  const { exams } = useContext(TestContext);
  
  // Safely extract roles and permissions
  const roles = userCtx?.roles || {};
  let permissions: any = [];
  Object.values(roles).forEach(
    (role: any) => {
      if (role?.permissions) {
        permissions = [...permissions, ...role.permissions];
      }
    }
  );

  const { ongoingTests, activeTests, inactiveTests, expiredTests } = state || {};

  function getColorByStatus(status: string) {
    return status === "Ongoing"
      ? "green"
      : status === "Active"
      ? "yellow"
      : "red";
  }

  const handleDeleteTest = useCallback(async (testId: string) => {
    console.log(testId);
    try {
      message.loading("Deleting Test", 1);
      const res = await API_TESTS().delete("test/delete/" + testId);
      setData((prevData: any[]) => prevData.filter((test: any) => test._id !== testId));
      message.destroy();
      message.success("Deleted Successfully");
    } catch (error) {
      message.destroy();
      message.error("Some Error Occurred");
    }
  }, []);

  const isTestComplete = (test: any): boolean => {
    let isComplete = true;
    
    test.sections?.forEach((section: any) => {
      section.subSections?.forEach((subSection: any) => {
        if (!subSection?.questions || 
            subSection.questions.length !== subSection.totalQuestions) {
          isComplete = false;
        }
      });
    });
    
    return isComplete;
  };

  const handleActivateTest = useCallback(async (testId: string) => {
    try {
      const loading = message.loading("Activating Test...", 0);
      const res = await API_TESTS().patch(`/test/update`, {
        _id: testId,
        status: "Active",
        modifiedAt: new Date().toISOString()
      });
      loading();
      message.success("Test Activated Successfully");
      
      // Refresh the data
      handleChangeTab(null, tab);
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Failed to activate test");
    }
  }, [tab]);

  const handleReuseTest = useCallback(async (testId: string) => {
    try {
      const loading = message.loading("Creating duplicate test...", 0);
      
      // Fetch the full test data
      const testData = await fetchTestByID(testId);
      const newId = `TT_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      // Create a new test with same data but new ID and dates
      const newTest = {
        ...testData.data,
        id: newId,
        _id: newId,
        name: `${testData.data.name} - Copy`,
        status: "Inactive",
        validity: {
          from: new Date().toISOString(),
          to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        result: {
          ...testData.data.result,
          students: [],
          publishProps: {
            ...testData.data.result.publishProps,
            isPublished: false,
            publishDate: null
          }
        }
      };
      
      const res = await API_TESTS().post(`/test/create`, newTest);
      loading();
      message.success("Test duplicated successfully. Redirecting to edit...");
      
      // Navigate to edit the new test
      setTimeout(() => {
        navigate(`/test/edit/${res.data.data._id}`);
      }, 1000);
      
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Failed to reuse test");
    }
  }, [fetchTestByID, navigate]);

  function getStatus(validity: any) {
    const testDateRange = [dayjs(validity.from), dayjs(validity.to)];
    if (testDateRange[0] && testDateRange[1]) {
      if (dayjs().isBefore(testDateRange[0])) {
        return "Upcoming";
      }
      if (dayjs().isAfter(testDateRange[1])) {
        return "Expired";
      }
      return "Ongoing";
    }
    return "Active";
  }

  // Memoize columns to prevent recreation on every render
  const columns = useMemo(() => [
    {
      title: "ID",
      dataIndex: "_id",
      width: 100,
      fixed: "left" as const,
      render: (text: string) => (
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
            display: "inline-block",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 150,
      searchable: true,
      fixed: "left" as const,
      render: (name: string, row: any) => (
        <Link to={`/test/edit/${row._id}`}>
          <MLink className={styles.ellipsis}>{name}</MLink>
        </Link>
      ),
    },
    {
      title: "Exam",
      dataIndex: "exam",
      width: 150,
      filters: exams?.map((exam: any) => ({
        text: exam.name,
        value: exam.name,
      })),
      onFilter: (value: any, record: any) =>
        record.exam.name.indexOf(value) === 0,
      render: (exam: any) => (
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
            display: "inline-block",
          }}
        >
          {exam?.name || 'N/A'}
        </span>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      width: 200,
      render: (date: string) => date ? new Date(date).toDateString() : 'N/A',
      sorter: (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Duration(min)",
      dataIndex: "durationInMinutes",
      width: 160,
      defaultSortOrder: "descend" as const,
      sorter: (a: any, b: any) => a.durationInMinutes - b.durationInMinutes,
    },
    {
      title: "Start Time",
      width: 150,
      render: (row: any) => row?.validity?.from ? new Date(row.validity.from).toLocaleString() : 'N/A',
      defaultSortOrder: "descend" as const,
      sorter: (a: any, b: any) =>
        new Date(a.validity?.from || 0).getTime() -
        new Date(b.validity?.from || 0).getTime(),
    },
    {
      title: "End Time",
      width: 150,
      render: (row: any) => row?.validity?.to ? new Date(row.validity.to).toLocaleString() : 'N/A',
      defaultSortOrder: "descend" as const,
      sorter: (a: any, b: any) =>
        new Date(a.validity?.to || 0).getTime() - new Date(b.validity?.to || 0).getTime(),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100,
      render: (status: string) => (
        <Tag color={getColorByStatus(status)}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      fixed: "right" as const,
      width: 200,
      render: (row: any) => {
        console.log("current tab:", tab);
        const testComplete = isTestComplete(row);
        
        // For Inactive Tests (tab === 1)
        if (tab === 1) {
          return (
            <div className={styles.flexRow}>
              <Tag color={testComplete ? "green" : "orange"}>
                {testComplete ? "Complete" : "Incomplete"}
              </Tag>
              {testComplete && (
                <Button 
                  type="primary"
                  onClick={() => handleActivateTest(row._id)}
                >
                  Activate Test
                </Button>
              )}
              <CustomPopConfirm
                title="Are you sure to delete Test?"
                onConfirm={() => handleDeleteTest(row._id)}
                cancelText="Cancel"
                okText="Yes, Delete"
              >
                <IconButton>
                  <DeleteForever />
                </IconButton>
              </CustomPopConfirm>
            </div>
          );
        }
        
        // For Expired Tests (tab === 4)
        if (tab === 4) {
          return (
            <div className={styles.flexRow}>
              {(row?.result?.publishProps?.type === "immediately" ||
                row?.result?.publishProps?.isPublished) && (
                <Button
                  onClick={() => {
                    navigate(
                      `/test/result/${row.name}/${row.exam.name}/${row._id}`
                    );
                  }}
                >
                  View Result
                </Button>
              )}
              <Button
                type="default"
                onClick={() => handleReuseTest(row._id)}
                icon={<CopyOutlined />}
              >
                Reuse Test
              </Button>
              <CustomPopConfirm
                title="Are you sure to delete Test?"
                onConfirm={() => handleDeleteTest(row._id)}
                cancelText="Cancel"
                okText="Yes, Delete"
              >
                <IconButton>
                  <DeleteForever />
                </IconButton>
              </CustomPopConfirm>
            </div>
          );
        }
        
        // Default behavior for other tabs (Active, Ongoing, Upcoming)
        if ((row?.result?.publishProps?.type === "immediately" ||
             row?.result?.publishProps?.isPublished) &&
            row?.status !== "Active") {
          return (
            <div className={styles.flexRow}>
              <Button
                onClick={() => {
                  navigate(
                    `/test/result/${row.name}/${row.exam.name}/${row._id}`
                  );
                }}
              >
                View Result
              </Button>
              <CustomPopConfirm
                title="Are you sure to delete Test?"
                onConfirm={() => handleDeleteTest(row._id)}
                cancelText="Cancel"
                okText="Yes, Delete"
              >
                <IconButton>
                  <DeleteForever />
                </IconButton>
              </CustomPopConfirm>
            </div>
          );
        } else {
          return (
            <div className={styles.flexRow}>
              <p>Result Not Published yet</p>
              <CustomPopConfirm
                title="Are you sure to delete Test?"
                onConfirm={() => handleDeleteTest(row._id)}
                cancelText="Cancel"
                okText="Yes, Delete"
              >
                <IconButton>
                  <DeleteForever />
                </IconButton>
              </CustomPopConfirm>
            </div>
          );
        }
      },
    },
  ], [exams, tab, styles.flexRow, styles.ellipsis]); // Add dependencies for memoization

  const handleChangeTab = useCallback((event: React.ChangeEvent<{}> | null, newValue: number) => {
    setTab(newValue);
    console.log(newValue);
    
    // Clear data and set loading before starting fetch
    setData([]);
    setLoading(true);

    const handleFetchCallback = (error: any, result: any[]) => {
      if (error) {
        console.log(error);
        setLoading(false);
        return;
      }
      
      setLoading(false);
      
      if (!result) {
        setData([]);
        return;
      }

      const mappedData = result.map((test: any) => ({
        ...test,
        key: test._id || test.id,
        id: test._id || test.id,
        name: test.name,
        createdAt: test.createdAt,
        status: test.status,
        exam: test.exam,
      }));

      setData(mappedData);
    };

    switch (newValue) {
      case 0: // Active
        fetchTest("active", false, handleFetchCallback);
        break;
      case 1: // Inactive
        fetchTest("inactive", false, handleFetchCallback);
        break;
      case 2: // Ongoing
        fetchTest("active", false, (error, result: any[]) => {
          if (error) {
            console.log(error);
            setLoading(false);
            return;
          }
          
          setLoading(false);
          const ongoingTests = result?.filter((t) => {
            return getStatus(t.validity) === "Ongoing";
          }) || [];
          
          setData(
            ongoingTests.map((test: any) => ({
              ...test,
              key: test._id || test.id,
              id: test._id || test.id,
              name: test.name,
              createdAt: test.createdAt,
              status: "Ongoing",
              exam: test.exam,
            }))
          );
        });
        break;
      case 3: // Upcoming
        fetchTest("active", false, (error, result: any[]) => {
          if (error) {
            console.log(error);
            setLoading(false);
            return;
          }
          
          setLoading(false);
          const upcomingTests = result?.filter((t) => {
            return getStatus(t.validity) === "Upcoming";
          }) || [];
          
          setData(
            upcomingTests.map((test: any) => ({
              ...test,
              key: test._id || test.id,
              id: test._id || test.id,
              name: test.name,
              createdAt: test.createdAt,
              status: "Upcoming",
              exam: test.exam,
            }))
          );
        });
        break;
      case 4: // Expired
        fetchTest("active", false, (error, result: any[]) => {
          if (error) {
            console.log(error);
            setLoading(false);
            return;
          }
          
          setLoading(false);
          const expiredTests = result?.filter((t) => {
            return getStatus(t.validity) === "Expired";
          }) || [];
          
          setData(
            expiredTests.map((test: any) => ({
              ...test,
              key: test._id || test.id,
              id: test._id || test.id,
              name: test.name,
              createdAt: test.createdAt,
              status: "Expired",
              exam: test.exam,
            }))
          );
        });
        break;
      default:
        break;
    }
  }, [fetchTest, tab]); // Add dependencies

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    if (fetchTest) {
      fetchTest("active", false, (error, result) => {
        if (error) {
          console.log(error);
          setLoading(false);
          return;
        }
        
        const mappedData = result?.map((test: any) => ({
          ...test,
          key: test._id || test.id,
          id: test._id || test.id,
          name: test.name,
          createdAt: test.createdAt,
          status: test.status,
          exam: test.exam,
        })) || [];
        
        setData(mappedData);
        setLoading(false);
      });
    }
  }, []); // Remove fetchTest dependency to prevent infinite loop

  // Add loading state for when context data is not ready
  if (!state) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout
      name="Test"
      menuActions={
        permissions.find((value: string) => value === "CREATE_TEST") && (
          <Button
            type="primary"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => navigate("/test/new")}
            icon={<AddIcon />}
          >
            Add New
          </Button>
        )
      }
    >
      {currentUser?.userType !== "student" ? (
        <div className={styles.container}>
          <div className={styles.header}>
            <Tabs value={tab} onChange={handleChangeTab}>
              <Tab label="Active" />
              <Tab label="Inactive" />
              <Tab label="Ongoing" />
              <Tab label="Upcoming" />
              <Tab label="Expired" />
            </Tabs>
          </div>
          {[...Array(5)].map((_, index) => (
            <TabPanel key={index} value={tab} index={index}>
              <div className={styles.data}>
                <CustomTable
                  loading={loading}
                  selectable={false}
                  columns={columns}
                  dataSource={data}
                  scroll={{ x: 600, y: 500 }}
                />
              </div>
            </TabPanel>
          ))}

          <Modal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            title="CreateTest"
            backdrop
          >
            Content
          </Modal>
        </div>
      ) : (
        <Error />
      )}
    </MainLayout>
  );
};

export default Test;