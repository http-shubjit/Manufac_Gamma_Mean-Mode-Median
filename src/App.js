import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Gamma } from "./components/Gamma";

export default function App() {
  return (
    <MantineProvider>
      <Gamma />
    </MantineProvider>
  );
}
