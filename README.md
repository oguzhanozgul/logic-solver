# Logic solver
## Table of Contents
1. [Introduction](#introduction)</br>
2. [Screen Layout](#screen-layout)</br>
  a. [Title and the final result section](#yitle-and-the-final-result-section)</br>
  b. [Variables section](#variables-section)</br>
  c. [Calculation section](#calculation-section)</br>
3. [The Logic Node](#the-logic-node)</br>
4. [Variables](#variables)</br>
5. [Database](#database)</br>
6. [Technologies used](#technologies-used)</br>
  a. [Language](#language)</br>
  b. [Framework](#framework)</br>
  c. [Database](#techdatabase)</br>
  d. [Cloud platform](#cloud-platform)</br>
  e. [External APIs](#external-apis)</br>
  f. [Notable packages](#notable-packages)</br>


## Introduction
Logic solver is a graphical logic operations calculator. The basic element of the calculations is the "Logic Node", which consists of two operands and one operator. The user can also defined variables, assign values to them and used them in the calculations.
</br>
To use, fork and clone to local, use `npm install` to install node modules and dependencies. Then use `npm start` or `npm run start` to run.
</br>

## Screen Layout
The screen is divided into three main parts:

### Title and the final result section
This section is at the top of the screen, displays the application title and below that, the result of the outermost (final) logic node as "true" or "false".

### Variables section
This sesction is at the left of the screen. It starts of as single "Add Variable" button, and once more variablaes are added, it expands down listing the variables. The user can add or remove variables, change variable names and change variable values in this section.

### Calculation section
This section is at the middle of the screen. It's the main section where the user will build their logical operations, set values to the operands, set the operators.

## The Logic Node
The logic node is the main calculation element. It consists of:
- Operation: each logic node has one opearation. The user can select the below operations in each node:
    - AND
    - OR
    - NAND
    - NOR
    - XOR
- Operands: each logic node has two operands. The left operand and the right operand. The user can select the below options/values for each operand:
    - TRUE: This sets the value of the operand to `true`.
    - FALSE: This sets the value of the operand to `false`.
    - Operation...: This creates a logic node as of the operand, and sets the value of the operand to the result of that logic node.
    - `Variable name`: This sets the value of the operand to the value of the given variable, and displays the name of the variable. When the user changes the name or the value of any variable in the variables section, these values are updated in the logic node as well. When the variable is deleted in the variable section, the value of the operand is set to `true`.
- Logic node value indicator: each logic node has its calculated value indicated by a badge in the upper left corner of its border. Additonally, the background of the logic node is changed to reflect the calculation result.

## Variables
The user can defined variables. Each variable has a name, a value and an id. id is not visible to the user, but instead used internally. The user adds a new variable by clicking on the add varible button, whic opens a modal window. In the modal window, the user enters the variable name and clicks the Add button. If there is no other variable with the same name, a new variable with the given name is created added to the list with a value of `false`. If a variable with the same name already exists, an alert is shown.

Variable names are limited to 8 characters which can be any character.

The user can change the name of any variable in the list by clicking it's name. This opens a modal window where the user can enter a new name for the variable. If there is no other variable with the same name, the name of the variable is changed to the new name. If a variable with the same name already exists, an alert is shown. The new name of the variable is immediately reflected in the calculation area if the variable is used as any of the operands.

The user can change the value of each variable to `true` or `false` in the same section. The background color of the variable changes based on its value. The new value of the variable is immediately reflected in the calculation area if the variable is used as any of the operands.

The user can delete any variable by clicking the `x` button. The variable is then deleted. If the variable is used as any of the operands in the calculation section, the values of the operands are set as `true`.

## Project Stucture
The project folders are as below:
- root: Contains the index.tsx, App.tsx and the .css file.
- components: Contains the components used in the app (LogicNode.tsx, Operand.tsx, etc.)
- contexts: Contains the React context file. The single context file keeps the variables.
- functions: Constains the Operation.ts file which has the logic calculations inside.
- types: Contains the defined types (two of them: `operatorType.ts` and `variable.ts`)
## Technologies used:
### Language:
- Typescript
### Framework:
- react.js
### Database: <a name="techdatabase"></a>
- No databases are used in this project.
### Containerization:
- No containerization are used in this project.
### Cloud platform:
- No cloud platforms are used in this project.

### External APIs:
- No external APIs are used in this project.
### Notable packages:

- react-bootstrap</br>
</br>
