import { TabView, TabPanel } from "primereact/tabview";
import SchoolForm from "./SchoolForm";
import TeacherTab from "./TeacherTab";
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
        </TabPanel>
        <TabPanel header="ICard Template">
        </TabPanel>
      </TabView>
    </>
  );
}
