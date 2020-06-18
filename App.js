import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [courseGoals, setCoursegoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    setCoursegoals((currentgoals) => [
      ...currentgoals,
      { id: Math.random().toString(), value: enteredGoal },
    ]);
    setIsAddMode(false);
    setEnteredGoal("");
  };

  const removeGoalHandler = (goalId) => {
    setCoursegoals((currentgoals) => {
      return currentgoals.filter((goal) => goal.id !== goalId);
    });
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add new goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        visible={isAddMode}
        goalInputHandler={goalInputHandler}
        enteredGoal={enteredGoal}
        addGoalHandler={addGoalHandler}
        onCancel={cancelGoalAdditionHandler}
      />
      <FlatList
        data={courseGoals}
        renderItem={(itemdata) => (
          <GoalItem
            id={itemdata.item.id}
            onDelete={removeGoalHandler}
            title={itemdata.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
