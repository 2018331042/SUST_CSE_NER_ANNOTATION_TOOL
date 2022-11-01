import React from "react";
import AnnotatorNavbar from "../../components/annotatorNavbar";
import Page from "../../components/page";

const Stats = () => {
  return (
    <Page>
      <AnnotatorNavbar>
        <div>Stats</div>
      </AnnotatorNavbar>
    </Page>
  );
};

export default Stats;

export async function getServerSideProps(ctx: any) {}
