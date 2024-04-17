'use client'
import { Button } from "primereact/button";
import FormInput from "../../../src/components/FormInput";
import { useState } from "react";
import useMultiState from "../../../src/hooks/useMultiState";

export default function Home() {
  const [data, addState, getState, deleteState] = useMultiState();

  return (
    <>
      <p>{JSON.stringify(data)}</p>
      <div className="client">
        <FormInput label="Nom du client" name="name" onChange={(name) => addState("username", name)} />
        <FormInput label="Nom du responsable" name="resp" onChange={(resp) => addState("responsable", resp)} />
        <FormInput label="Email" name="email" onChange={(email) => addState("email", email)} />
      </div>
      <Button onClick={() => deleteState("username")}>Die :D</Button>
    </>
  );
}
