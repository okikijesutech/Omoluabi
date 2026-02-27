import React, { useState } from "react";
import { ApiService } from "../../../services/ApiService";
import { Lesson, Difficulty } from "../../../core/types";
import "./contribute.css";

const Contribute = () => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const lesson: Partial<Lesson> = {
      id: `custom_${Date.now()}`,
      title,
      difficulty,
      exercises: [], // In a full implementation, we'd add an exercise builder UI
    };

    try {
      await ApiService.submitLesson(lesson as Lesson, "community_user");
      setMessage("Thank you! Your lesson has been submitted for review.");
      setTitle("");
    } catch (err) {
      setMessage("Failed to submit lesson. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='contribute-container'>
      <h1>Community Contribution</h1>
      <p>Help us grow Omoluabi by contributing new lessons and verifying content.</p>

      <div className='contribution-form'>
        <h2>Propose a New Lesson</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Lesson Title</label>
            <input 
              type='text' 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder='e.g., Traditional Weddings'
              required
            />
          </div>

          <div className='form-group'>
            <label>Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
              <option value='beginner'>Beginner</option>
              <option value='intermediate'>Intermediate</option>
              <option value='advanced'>Advanced</option>
            </select>
          </div>

          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit for Review"}
          </button>
        </form>
        {message && <p className='form-message'>{message}</p>}
      </div>

      <div className='ai-assistant'>
        <h2>AI Content Helper</h2>
        <p>Short on time? Use our AI helper to generate a draft lesson about any topic.</p>
        <button className='secondary-btn' onClick={() => alert("AI feature coming soon to this UI!")}>
          Generate with AI
        </button>
      </div>
    </div>
  );
};

export default Contribute;
