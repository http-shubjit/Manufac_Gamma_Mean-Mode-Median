import cx from "clsx";
import { useState } from "react";
import { Table, ScrollArea } from "@mantine/core";
import classes from "./Gamma.module.css";
import { data } from "../data";

export function Gamma() {
  const [scrolled, setScrolled] = useState(false);

  function calculateMeanModeMedian(data) {
    let alcohol1 = [];
    let alcohol2 = [];
    let alcohol3 = [];
    data.map((items) => {
      items.map((val) => {
        if (val.Alcohol === 1) {
          alcohol1.push(Number((val.Ash * val.Hue) / val.Magnesium));
        } else if (val.Alcohol === 2) {
          alcohol2.push(Number((val.Ash * val.Hue) / val.Magnesium));
        } else if (val.Alcohol === 3) {
          alcohol3.push(Number((val.Ash * val.Hue) / val.Magnesium));
        }
      });
    });

    // calculate Mean
    let meanOfAlcohol1 = calculateMean(alcohol1);
    let meanOfAlcohol2 = calculateMean(alcohol2);
    let meanOfAlcohol3 = calculateMean(alcohol3);

    // Calculate mode
    const modeOfAlcohol1 = calculateMode(alcohol1);
    const modeOfAlcohol2 = calculateMode(alcohol2);
    const modeOfAlcohol3 = calculateMode(alcohol3);

    // Calculate median
    const medianOfAlcohol1 = calculateMedian(alcohol1);
    const medianOfAlcohol2 = calculateMedian(alcohol2);
    const medianOfAlcohol3 = calculateMedian(alcohol3);

    function calculateMean(array) {
      const sum = array.reduce((acc, val) => acc + val, 0);
      const mean = (sum / array.length).toFixed(3);
      return mean;
    }

    function calculateMode(array) {
      const frequencyMap = {};
      let maxFrequency = 0;
      let mode;
      array.forEach((element) => {
        frequencyMap[element] = (frequencyMap[element] || 0) + 1;
        if (frequencyMap[element] > maxFrequency) {
          maxFrequency = frequencyMap[element];
          mode = element.toFixed(3);
        }
      });

      return mode;
    }

    function calculateMedian(array) {
      const sortedArray = array.sort((a, b) => a - b);
      const length = sortedArray.length;
      if (length % 2 === 0) {
        const middle1 = sortedArray[length / 2 - 1];
        const middle2 = sortedArray[length / 2];
        return ((middle1 + middle2) / 2).toFixed(3);
      } else {
        return sortedArray[Math.floor(length / 2)].toFixed(3);
      }
    }

    return {
      meanOfAlcohol1,
      modeOfAlcohol1,
      medianOfAlcohol1,
      meanOfAlcohol2,
      modeOfAlcohol2,
      medianOfAlcohol2,
      meanOfAlcohol3,
      modeOfAlcohol3,
      medianOfAlcohol3,
    };
  }
  const meanmodemedian = calculateMeanModeMedian(data);

  return (
    <ScrollArea
      h={700}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table miw={400}>
        <Table.Thead
          className={cx(classes.header, { [classes.scrolled]: scrolled })}
        >
          <Table.Tr>
            <Table.Td>Measure</Table.Td>
            <Table.Td>Alcohol-1</Table.Td>
            <Table.Td>Alcohol-2</Table.Td>
            <Table.Td>Alcohol-3</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Gamma Mean</Table.Td>
            <Table.Td>{meanmodemedian.meanOfAlcohol1}</Table.Td>
            <Table.Td>{meanmodemedian.meanOfAlcohol2}</Table.Td>
            <Table.Td>{meanmodemedian.meanOfAlcohol3}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Gamma Median</Table.Td>
            <Table.Td>{meanmodemedian.medianOfAlcohol1}</Table.Td>
            <Table.Td>{meanmodemedian.medianOfAlcohol2}</Table.Td>
            <Table.Td>{meanmodemedian.medianOfAlcohol3}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td> Gamma Mode</Table.Td>
            <Table.Td>{meanmodemedian.modeOfAlcohol1}</Table.Td>
            <Table.Td>{meanmodemedian.modeOfAlcohol2}</Table.Td>
            <Table.Td>{meanmodemedian.modeOfAlcohol3}</Table.Td>
          </Table.Tr>
        </Table.Thead>
      </Table>
    </ScrollArea>
  );
}
