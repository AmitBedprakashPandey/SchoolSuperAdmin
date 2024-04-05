import { TabView, TabPanel } from "primereact/tabview";
import SchoolForm from "./SchoolForm";
import TeacherTab from "./TeacherTab";
import ThirdParty from "./ThirdParty";
import ImageTest from "./ImageTest";
export default function SchoolDasboard({data}) {
  return (
    <>
      <TabView>
        <TabPanel header="Update School">
          <SchoolForm label="u" data={data} />
        </TabPanel>
        <TabPanel header="Teacher">
            <TeacherTab schoolid={data?._id}/>
        </TabPanel>
        <TabPanel header="Third Party">
          <ThirdParty data={data}/>
        </TabPanel>
        <TabPanel header="ICard Template">
          <ImageTest data={data?._id}/>
        </TabPanel>
      </TabView>
    </>
  );
}
