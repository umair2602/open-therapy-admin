"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Search, Filter, Tag } from 'lucide-react';

const LifeAreaPromptsUI = () => {
  const [prompts, setPrompts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  
  const [formData, setFormData] = useState({
    slug: '',
    area_vida: '',
    nome_publico: '',
    tag: '',
    clima: '',
    modelo: '',
    tom: '',
    objetivo: '',
    sugestao_ia: '',
    nivel_prioridade: '',
    idioma: '',
    mensagem_base: '',
    problemas_associados: [],
    perguntas: []
  });

  const [newProblem, setNewProblem] = useState({
    id: '',
    descricao: '',
    tags: [],
    nivel_risco: '',
    sugestao_ia: ''
  });

  const [newQuestion, setNewQuestion] = useState('');
  const [newProblemTag, setNewProblemTag] = useState('');

  // Sample data for demonstration
  useEffect(() => {
    setPrompts([
      {
        _id: '1',
        slug: 'mental-health',
        area_vida: 'Mental Health',
        nome_publico: 'Psychological Well-being',
        tag: 'health',
        clima: 'welcoming',
        modelo: 'gpt-4',
        tom: 'empathetic',
        objetivo: 'Help with mental health issues',
        sugestao_ia: 'Focus on mindfulness techniques',
        nivel_prioridade: 'high',
        idioma: 'en-US',
        mensagem_base: 'Let\'s talk about your mental well-being...',
        problemas_associados: [
          {
            id: 'p1',
            descricao: 'Generalized anxiety',
            tags: ['anxiety', 'stress'],
            nivel_risco: 'medium',
            sugestao_ia: 'Breathing techniques'
          }
        ],
        perguntas: ['How have you been feeling lately?', 'What worries you the most?']
      }
    ]);
  }, []);

  const resetForm = () => {
    setFormData({
      slug: '',
      area_vida: '',
      nome_publico: '',
      tag: '',
      clima: '',
      modelo: '',
      tom: '',
      objetivo: '',
      sugestao_ia: '',
      nivel_prioridade: '',
      idioma: '',
      mensagem_base: '',
      problemas_associados: [],
      perguntas: []
    });
    setNewProblem({
      id: '',
      descricao: '',
      tags: [],
      nivel_risco: '',
      sugestao_ia: ''
    });
    setNewQuestion('');
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data',formData);
    // if (editingId) {
    //   setPrompts(prompts.map(p => p._id === editingId ? { ...formData, _id: editingId } : p));
    // } else {
    //   setPrompts([...prompts, { ...formData, _id: Date.now().toString() }]);
    // }
    // setShowForm(false);
    // resetForm();
  };

  const handleEdit = (prompt) => {
    setFormData(prompt);
    setEditingId(prompt._id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this prompt?')) {
      setPrompts(prompts.filter(p => p._id !== id));
    }
  };

  const addProblem = () => {
    if (newProblem.id && newProblem.descricao) {
      setFormData({
        ...formData,
        problemas_associados: [...formData.problemas_associados, { ...newProblem }]
      });
      setNewProblem({
        id: '',
        descricao: '',
        tags: [],
        nivel_risco: '',
        sugestao_ia: ''
      });
    }
  };

  const removeProblem = (index) => {
    setFormData({
      ...formData,
      problemas_associados: formData.problemas_associados.filter((_, i) => i !== index)
    });
  };

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setFormData({
        ...formData,
        perguntas: [...formData.perguntas, newQuestion.trim()]
      });
      setNewQuestion('');
    }
  };

  const removeQuestion = (index) => {
    setFormData({
      ...formData,
      perguntas: formData.perguntas.filter((_, i) => i !== index)
    });
  };

  const addTagToProblem = () => {
    if (newProblemTag.trim()) {
      setNewProblem({
        ...newProblem,
        tags: [...newProblem.tags, newProblemTag.trim()]
      });
      setNewProblemTag('');
    }
  };

  const removeTagFromProblem = (index) => {
    setNewProblem({
      ...newProblem,
      tags: newProblem.tags.filter((_, i) => i !== index)
    });
  };

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.nome_publico.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.area_vida.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterTag || prompt.tag === filterTag;
    return matchesSearch && matchesFilter;
  });

  const uniqueTags = [...new Set(prompts.map(p => p.tag))];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Life Area Prompts</h1>
              <p className="text-gray-600 mt-1">Manage prompts for different life areas</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              New Prompt
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All tags</option>
                {uniqueTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingId ? 'Edit Prompt' : 'New Prompt'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Life Area *</label>
                    <input
                      type="text"
                      required
                      value={formData.area_vida}
                      onChange={(e) => setFormData({...formData, area_vida: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Public Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.nome_publico}
                      onChange={(e) => setFormData({...formData, nome_publico: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tag *</label>
                    <input
                      type="text"
                      required
                      value={formData.tag}
                      onChange={(e) => setFormData({...formData, tag: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Climate *</label>
                    <select
                      required
                      value={formData.clima}
                      onChange={(e) => setFormData({...formData, clima: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="welcoming">Welcoming</option>
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="motivational">Motivational</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
                    <select
                      required
                      value={formData.modelo}
                      onChange={(e) => setFormData({...formData, modelo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="gpt-4">GPT-4</option>
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                      <option value="claude">Claude</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tone *</label>
                    <select
                      required
                      value={formData.tom}
                      onChange={(e) => setFormData({...formData, tom: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="empathetic">Empathetic</option>
                      <option value="direct">Direct</option>
                      <option value="encouraging">Encouraging</option>
                      <option value="analytical">Analytical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level *</label>
                    <select
                      required
                      value={formData.nivel_prioridade}
                      onChange={(e) => setFormData({...formData, nivel_prioridade: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language *</label>
                    <select
                      required
                      value={formData.idioma}
                      onChange={(e) => setFormData({...formData, idioma: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="pt-BR">Portuguese (Brazil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                </div>

                {/* Text Areas */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Objective *</label>
                    <textarea
                      required
                      value={formData.objetivo}
                      onChange={(e) => setFormData({...formData, objetivo: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">AI Suggestion *</label>
                    <textarea
                      required
                      value={formData.sugestao_ia}
                      onChange={(e) => setFormData({...formData, sugestao_ia: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Base Message *</label>
                    <textarea
                      required
                      value={formData.mensagem_base}
                      onChange={(e) => setFormData({...formData, mensagem_base: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Associated Problems */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Associated Problems</h3>
                  
                  {/* Add New Problem */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Problem ID</label>
                        <input
                          type="text"
                          value={newProblem.id}
                          onChange={(e) => setNewProblem({...newProblem, id: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
                        <select
                          value={newProblem.nivel_risco}
                          onChange={(e) => setNewProblem({...newProblem, nivel_risco: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select...</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <input
                        type="text"
                        value={newProblem.descricao}
                        onChange={(e) => setNewProblem({...newProblem, descricao: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newProblemTag}
                          onChange={(e) => setNewProblemTag(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Add tag..."
                        />
                        <button
                          type="button"
                          onClick={addTagToProblem}
                          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                        >
                          <Tag size={16} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {newProblem.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTagFromProblem(index)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">AI Suggestion</label>
                      <input
                        type="text"
                        value={newProblem.sugestao_ia}
                        onChange={(e) => setNewProblem({...newProblem, sugestao_ia: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addProblem}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add Problem
                    </button>
                  </div>

                  {/* List of Problems */}
                  <div className="space-y-2">
                    {formData.problemas_associados.map((problem, index) => (
                      <div key={index} className="bg-white border rounded-lg p-3 flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{problem.descricao}</div>
                          <div className="text-sm text-gray-600">ID: {problem.id} | Risk: {problem.nivel_risco}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {problem.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeProblem(index)}
                          className="text-red-600 hover:text-red-800 ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Questions */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions</h3>
                  
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add question..."
                    />
                    <button
                      type="button"
                      onClick={addQuestion}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formData.perguntas.map((question, index) => (
                      <div key={index} className="bg-white border rounded-lg p-3 flex justify-between items-center">
                        <span className="flex-1">{question}</span>
                        <button
                          type="button"
                          onClick={() => removeQuestion(index)}
                          className="text-red-600 hover:text-red-800 ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Save size={16} />
                    {editingId ? 'Update' : 'Create'} Prompt
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Prompts List */}
        <div className="grid gap-6">
          {filteredPrompts.map((prompt) => (
            <div key={prompt._id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{prompt.nome_publico}</h3>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{prompt.tag}</span>
                      <span className={`px-2 py-1 rounded text-sm ${
                        prompt.nivel_prioridade === 'critical' ? 'bg-red-100 text-red-800' :
                        prompt.nivel_prioridade === 'high' ? 'bg-orange-100 text-orange-800' :
                        prompt.nivel_prioridade === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {prompt.nivel_prioridade}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{prompt.area_vida}</p>
                    <p className="text-sm text-gray-500">Slug: {prompt.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(prompt)}
                      className="text-blue-600 hover:text-blue-800 p-2"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(prompt._id)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Climate:</span>
                    <p className="text-sm text-gray-900">{prompt.clima}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Model:</span>
                    <p className="text-sm text-gray-900">{prompt.modelo}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Tone:</span>
                    <p className="text-sm text-gray-900">{prompt.tom}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Language:</span>
                    <p className="text-sm text-gray-900">{prompt.idioma}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Objective:</span>
                    <p className="text-sm text-gray-900 mt-1">{prompt.objetivo}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Base Message:</span>
                    <p className="text-sm text-gray-900 mt-1">{prompt.mensagem_base}</p>
                  </div>
                </div>

                {/* Problems and Questions */}
                {(prompt.problemas_associados.length > 0 || prompt.perguntas.length > 0) && (
                  <div className="border-t mt-4 pt-4">
                    {prompt.problemas_associados.length > 0 && (
                      <div className="mb-4">
                        <span className="text-sm font-medium text-gray-500">Associated Problems:</span>
                        <div className="mt-2 space-y-2">
                          {prompt.problemas_associados.map((problem, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-3">
                              <div className="font-medium text-gray-900 text-sm">{problem.descricao}</div>
                              <div className="text-xs text-gray-600 mt-1">
                                ID: {problem.id} | Risk: {problem.nivel_risco}
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {problem.tags.map((tag, tagIndex) => (
                                  <span key={tagIndex} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              {problem.sugestao_ia && (
                                <div className="text-xs text-gray-600 mt-1 italic">
                                  Suggestion: {problem.sugestao_ia}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {prompt.perguntas.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Questions:</span>
                        <div className="mt-2 space-y-1">
                          {prompt.perguntas.map((question, index) => (
                            <div key={index} className="bg-blue-50 rounded-lg p-2">
                              <span className="text-sm text-gray-900">{question}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {filteredPrompts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No prompts found</div>
              <p className="text-gray-500">
                {searchTerm || filterTag ? 'Try adjusting your search filters.' : 'Start by creating your first prompt.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LifeAreaPromptsUI;