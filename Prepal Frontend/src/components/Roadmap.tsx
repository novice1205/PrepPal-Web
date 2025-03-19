"use client";

import { useState, ChangeEvent } from "react";
import ReactFlow, { Handle, Position, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import Input from "./Input";
import Button from "./Button";

// Define type for topics
type TopicsType = {
  [key: string]: string[];
};

const topics: TopicsType = {
  python: [
    "Python Basics",
    "Data Structures",
    "Object-Oriented Programming",
    "File Handling and Modules",
    "Web Development with Django/Flask",
    "Data Science and Machine Learning",
  ],
  "web development": [
    "Internet Basics",
    "HTML & Semantic HTML",
    "CSS & Responsive Design",
    "JavaScript Fundamentals",
    "Frontend Frameworks (React, Angular)",
    "Backend Development (Node.js, Express)",
    "Database Management",
    "Version Control (Git & GitHub)",
    "Deployment & Hosting",
  ],
  "c programming": [
    "Introduction to C",
    "Data Types & Operators",
    "Control Structures",
    "Functions & Recursion",
    "Pointers & Memory Management",
    "Structures & File Handling",
    "Advanced C Concepts",
  ],
  "machine learning": [
    "Introduction to ML",
    "Supervised vs Unsupervised Learning",
    "Regression & Classification",
    "Neural Networks & Deep Learning",
    "Feature Engineering & Model Evaluation",
    "ML Frameworks (TensorFlow, PyTorch)",
  ],
};

// Define type for node data
interface RoadmapNodeData {
  label: string;
}

interface RoadmapNodeProps {
  data: RoadmapNodeData;
}

const RoadmapNode: React.FC<RoadmapNodeProps> = ({ data }) => (
  <div className="p-4 rounded shadow-lg text-black text-center bg-gray-100">
    <Handle type="target" position={Position.Top} className="bg-black" />
    {data.label}
    <Handle type="source" position={Position.Bottom} className="bg-black" />
  </div>
);

const Roadmap: React.FC = () => {
  const [topic, setTopic] = useState<string>("");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const generateRoadmap = () => {
    const lowerCaseTopic = topic.toLowerCase();

    if (!topics[lowerCaseTopic]) return;

    const roadmapItems = topics[lowerCaseTopic];

    // Generate nodes
    const generatedNodes: Node[] = roadmapItems.map((item, index) => ({
      id: `${index}`,
      position: { x: 200, y: index * 100 },
      data: { label: item },
      type: "customNode",
    }));

    // Generate edges
    const generatedEdges: Edge[] = roadmapItems.slice(1).map((_, index) => ({
      id: `e${index}-${index + 1}`,
      source: `${index}`,
      target: `${index + 1}`,
      type: "smoothstep",
      animated: true,
    }));

    setNodes(generatedNodes);
    setEdges(generatedEdges);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-black text-center">
        Generate Your Learning Roadmap
      </h2>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        <Input
          value={topic}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
          placeholder="Enter topic (e.g., Python, Web Development)"
          className="border-2 border-black p-2 w-full sm:w-auto"
          label="input topic"
        />
        <Button
          onClick={generateRoadmap}
          className="bg-black text-white px-4 py-2"
        >
          Generate
        </Button>
      </div>
      <div style={{ height: 500 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={{ customNode: RoadmapNode }}
          fitView
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
        />
      </div>
    </div>
  );
};

export default Roadmap;
