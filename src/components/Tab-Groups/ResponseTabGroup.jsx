import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { formatToHumanReadableDate } from "../../utils/DateTimeHelper";

import JsonEditorPane from "../Panes/Json/JsonEditorPane";
import ResponseHeaderPane from "../Panes/ResponseHeader/ResponseHeaderPane";

export default function ResponseTabGroup({ doc, setDoc, response, loading }) {
  const [historyData, setHistoryData] = useState([]);
  const [forceRefresh, setForceRefresh] = useState(false); // State to trigger API call

  useEffect(() => {
    if (!loading && (historyData.length === 0 || forceRefresh)) {
      // Make an API call to fetch history data when the "History" tab is selected or forceRefresh is true
      axios
        .get("https://postman-backend.onrender.com/api/history")
        .then((response) => {
          setHistoryData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching history data:", error);
        })
        .finally(() => {
          setForceRefresh(false); // Reset forceRefresh after API call is completed
        });
    }
  }, [loading, historyData, forceRefresh]);

  const renderHistoryItems = () => {
    return (
      <>
        <button
          className="mt-2 bg-secondary2 px-4 py-2 rounded-md hover:bg-secondary ml-3"
          onClick={() => setForceRefresh(true)}
        >
          Refresh
        </button>

        <div className="grid grid-cols-2 gap-4">
          {historyData.map((item, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">API URL:</span>
                <span className="text-secondary">{item.api_url}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Method:</span>
                <span className="text-secondary2">{item.method}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">CreatedAt:</span>
                <span className="text-secondary2">
                  {formatToHumanReadableDate(item.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const responseTabs = ["Response Body", "Response Header", "History"];

  return (
    <>
      <Tabs forceRenderTabPanel selectedTabClassName="border-b-2 ">
        <TabList className="flex mt-5 border border-secondary3 rounded-t-lg text-secondary3">
          {responseTabs.map((title, index) => (
            <Tab
              className={`mr-3 py-2 px-4 border-secondary focus:outline-none hover:text-secondary cursor-pointer text-secondary3 ${
                index === 2 ? "active-tab" : ""
              }`}
              key={index}
            >
              {title}
            </Tab>
          ))}
        </TabList>

        <div className="px-4 py-4 rounded-b-lg border border-t-0 border-secondary3 text-secondary3">
          {loading ? (
            <ThreeDots height="30" width="30" color="gray" visible={true} />
          ) : (
            <>
              <TabPanel>
                <JsonEditorPane
                  paneValue={doc}
                  setPaneValue={setDoc}
                  isEditable={false}
                />
              </TabPanel>
              <TabPanel>
                <ResponseHeaderPane response={response} />
              </TabPanel>
              <TabPanel>{renderHistoryItems()}</TabPanel>
            </>
          )}
        </div>
      </Tabs>
    </>
  );
}
