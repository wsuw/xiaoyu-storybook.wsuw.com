import React, { useState } from 'react';
import type { FormulaQuizData } from './quizTypes';

export interface FormulaPracticeQuizProps {
  data: FormulaQuizData;
}

export const FormulaPracticeQuiz: React.FC<FormulaPracticeQuizProps> = ({ data }) => {
  const { formulaName, formulaSymbol, themeColor, questions } = data;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];
  const currentAnswer = userAnswers[currentQ.id] ?? '';
  const isCurrentSubmitted = !!submittedQuestions[currentQ.id];

  // 答案判定辅助函数
  const checkAnswer = (qId: string, answer: string): boolean => {
    const q = questions.find((item) => item.id === qId);
    if (!q || !answer.trim()) return false;
    if (q.type === 'choice') {
      return answer.trim() === q.correctAnswer.trim();
    }
    // 填空题支持数值容差容错
    const numAns = parseFloat(answer.trim());
    const numCorrect = parseFloat(q.correctAnswer.trim());
    if (isNaN(numAns) || isNaN(numCorrect)) {
      return answer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
    }
    const tol = q.tolerance ?? 0.01;
    return Math.abs(numAns - numCorrect) <= tol;
  };

  const isCurrentCorrect = isCurrentSubmitted && checkAnswer(currentQ.id, currentAnswer);

  const handleSubmitCurrent = () => {
    if (!currentAnswer.trim()) return;
    setSubmittedQuestions((prev) => ({ ...prev, [currentQ.id]: true }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setSubmittedQuestions({});
    setIsFinished(false);
  };

  // 结算成绩统计
  const totalCorrect = questions.filter((q) => checkAnswer(q.id, userAnswers[q.id] ?? '')).length;
  const score = Math.round((totalCorrect / questions.length) * 100);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        boxSizing: 'border-box',
        background: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#1e293b',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 顶部 Header 导航条 */}
      <div
        style={{
          flexShrink: 0,
          padding: '16px 32px',
          borderBottom: '1px solid #e2e8f0',
          background: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: `${themeColor}15`,
              color: themeColor,
              fontWeight: 800,
              fontSize: '15px',
              border: `1px solid ${themeColor}30`,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            }}
          >
            {formulaSymbol}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
              {formulaName} · 实战练习闯关
            </h2>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
              模拟真实家装定制工程与下料计算题，即时校验答案与深度步骤解析
            </div>
          </div>
        </div>

        {/* 题目进度徽标 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>
            进度：<span style={{ color: themeColor, fontWeight: 800 }}>{currentIndex + 1}</span> / {questions.length}
          </div>
          <div
            style={{
              width: '120px',
              height: '8px',
              borderRadius: '999px',
              background: '#e2e8f0',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
                height: '100%',
                background: themeColor,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* 主答题区域 / 结算报告 */}
      <div
        style={{
          flex: 1,
          maxWidth: '920px',
          width: '100%',
          margin: '0 auto',
          padding: '32px 24px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {!isFinished ? (
          <>
            {/* 题目主卡片 */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                padding: '28px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* 题型与标题 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '6px',
                    background: currentQ.type === 'choice' ? '#f1f5f9' : '#eff6ff',
                    color: currentQ.type === 'choice' ? '#475569' : '#2563eb',
                    border: '1px solid #cbd5e1',
                  }}
                >
                  {currentQ.type === 'choice' ? '单项选择' : '数值填空'}
                </span>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                  第 {currentIndex + 1} 题：{currentQ.title}
                </h3>
              </div>

              {/* 真实家装工程背景情境 */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderLeft: `4px solid ${themeColor}`,
                  borderRadius: '10px',
                  padding: '16px 20px',
                  fontSize: '14px',
                  lineHeight: '1.75',
                  color: '#334155',
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: '6px', color: '#0f172a' }}>
                  🏗️ 家装实战场景背景：
                </div>
                {currentQ.scenario}
              </div>

              {/* 相关核心公式标注 */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: '#64748b',
                }}
              >
                <span>涉及公式：</span>
                <code
                  style={{
                    background: '#f1f5f9',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    color: '#0f172a',
                    fontWeight: 600,
                    fontFamily: 'monospace',
                  }}
                >
                  {currentQ.formula}
                </code>
              </div>

              {/* 答题交互：单选 Radio List 或 数值填空 Input */}
              {currentQ.type === 'choice' && currentQ.options ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentQ.options.map((opt) => {
                    const isSelected = currentAnswer === opt.value;
                    const isOptionCorrect = opt.value === currentQ.correctAnswer;

                    // 提交后的状态颜色
                    let borderCol = isSelected ? themeColor : '#e2e8f0';
                    let bgCol = isSelected ? `${themeColor}08` : '#ffffff';

                    if (isCurrentSubmitted) {
                      if (isOptionCorrect) {
                        borderCol = '#10b981';
                        bgCol = '#10b98115';
                      } else if (isSelected && !isOptionCorrect) {
                        borderCol = '#ef4444';
                        bgCol = '#ef444415';
                      }
                    }

                    return (
                      <div
                        key={opt.value}
                        onClick={() => {
                          if (isCurrentSubmitted) return;
                          setUserAnswers((prev) => ({ ...prev, [currentQ.id]: opt.value }));
                        }}
                        style={{
                          border: `1.5px solid ${borderCol}`,
                          background: bgCol,
                          borderRadius: '10px',
                          padding: '14px 18px',
                          cursor: isCurrentSubmitted ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '14px',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              border: `2px solid ${isSelected ? (isCurrentSubmitted ? (isOptionCorrect ? '#10b981' : '#ef4444') : themeColor) : '#cbd5e1'}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: '#ffffff',
                              flexShrink: 0,
                            }}
                          >
                            {isSelected && (
                              <div
                                style={{
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                  background: isCurrentSubmitted ? (isOptionCorrect ? '#10b981' : '#ef4444') : themeColor,
                                }}
                              />
                            )}
                          </div>
                          <div>
                            <span style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b' }}>
                              {opt.label}
                            </span>
                            {opt.hint && (
                              <span style={{ fontSize: '13px', color: '#64748b', marginLeft: '8px' }}>
                                ({opt.hint})
                              </span>
                            )}
                          </div>
                        </div>

                        {isCurrentSubmitted && isOptionCorrect && (
                          <span style={{ color: '#10b981', fontWeight: 700, fontSize: '14px' }}>
                            ✓ 正确答案
                          </span>
                        )}
                        {isCurrentSubmitted && isSelected && !isOptionCorrect && (
                          <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '14px' }}>
                            ✕ 回答错误
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ position: 'relative', width: '260px' }}>
                      <input
                        type="text"
                        disabled={isCurrentSubmitted}
                        value={currentAnswer}
                        placeholder={currentQ.placeholder ?? '请输入计算答案数值...'}
                        onChange={(e) =>
                          setUserAnswers((prev) => ({ ...prev, [currentQ.id]: e.target.value }))
                        }
                        style={{
                          width: '100%',
                          padding: '12px 42px 12px 16px',
                          boxSizing: 'border-box',
                          borderRadius: '8px',
                          border: `1.5px solid ${isCurrentSubmitted ? (isCurrentCorrect ? '#10b981' : '#ef4444') : '#cbd5e1'}`,
                          fontSize: '16px',
                          fontWeight: 600,
                          color: '#0f172a',
                          outline: 'none',
                          background: isCurrentSubmitted ? '#f8fafc' : '#ffffff',
                        }}
                      />
                      {currentQ.unit && (
                        <span
                          style={{
                            position: 'absolute',
                            right: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#64748b',
                            fontSize: '14px',
                            fontWeight: 600,
                          }}
                        >
                          {currentQ.unit}
                        </span>
                      )}
                    </div>

                    {!isCurrentSubmitted ? (
                      <button
                        onClick={handleSubmitCurrent}
                        disabled={!currentAnswer.trim()}
                        style={{
                          padding: '12px 24px',
                          borderRadius: '8px',
                          border: 'none',
                          background: currentAnswer.trim() ? themeColor : '#cbd5e1',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '15px',
                          cursor: currentAnswer.trim() ? 'pointer' : 'not-allowed',
                          boxShadow: currentAnswer.trim() ? `0 4px 12px ${themeColor}40` : 'none',
                        }}
                      >
                        提交判定
                      </button>
                    ) : (
                      <div
                        style={{
                          fontSize: '15px',
                          fontWeight: 700,
                          color: isCurrentCorrect ? '#10b981' : '#ef4444',
                        }}
                      >
                        {isCurrentCorrect
                          ? '✓ 答对了！'
                          : `✕ 答错了，正确数值为：${currentQ.correctAnswer} ${currentQ.unit ?? ''}`}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 单选模式下的提交按钮 */}
              {currentQ.type === 'choice' && !isCurrentSubmitted && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '8px' }}>
                  <button
                    onClick={handleSubmitCurrent}
                    disabled={!currentAnswer.trim()}
                    style={{
                      padding: '12px 28px',
                      borderRadius: '8px',
                      border: 'none',
                      background: currentAnswer.trim() ? themeColor : '#cbd5e1',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '15px',
                      cursor: currentAnswer.trim() ? 'pointer' : 'not-allowed',
                      boxShadow: currentAnswer.trim() ? `0 4px 12px ${themeColor}40` : 'none',
                    }}
                  >
                    确认提交
                  </button>
                </div>
              )}

              {/* 答案详尽公式推导与步骤解析 (提交后自动展开) */}
              {isCurrentSubmitted && (
                <div
                  style={{
                    marginTop: '8px',
                    borderRadius: '12px',
                    background: isCurrentCorrect ? '#f0fdf4' : '#fef2f2',
                    border: `1px solid ${isCurrentCorrect ? '#bbf7d0' : '#fecaca'}`,
                    padding: '20px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 800,
                      fontSize: '15px',
                      color: isCurrentCorrect ? '#166534' : '#991b1b',
                    }}
                  >
                    {isCurrentCorrect ? '🎉 公式代入推导演练（正确）' : '💡 公式代入推导与深度解析'}
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      lineHeight: '1.8',
                      color: isCurrentCorrect ? '#14532d' : '#7f1d1d',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {currentQ.explanation}
                  </div>
                </div>
              )}
            </div>

            {/* 底部前后导航按钮 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: currentIndex === 0 ? '#94a3b8' : '#334155',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                ← 上一题
              </button>

              <button
                onClick={handleNext}
                disabled={!isCurrentSubmitted}
                style={{
                  padding: '10px 26px',
                  borderRadius: '8px',
                  border: 'none',
                  background: isCurrentSubmitted ? themeColor : '#cbd5e1',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: isCurrentSubmitted ? 'pointer' : 'not-allowed',
                  boxShadow: isCurrentSubmitted ? `0 4px 12px ${themeColor}30` : 'none',
                }}
              >
                {currentIndex < questions.length - 1 ? '下一题 →' : '查看闯关总成绩 🏆'}
              </button>
            </div>
          </>
        ) : (
          /* 闯关完成结算报告卡片 */
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
              padding: '48px 36px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: `${themeColor}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
              }}
            >
              {score >= 80 ? '🥇' : score >= 60 ? '🥈' : '🎯'}
            </div>

            <div>
              <h3 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>
                {score === 100
                  ? '满分通关！参数化公式实战专家！'
                  : score >= 60
                    ? '闯关成功！掌握核心工程运算！'
                    : '已完成练习，建议回顾公式重新强化！'}
              </h3>
              <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '15px' }}>
                在《{formulaName}》专项测试中，共 {questions.length} 题，答对 {totalCorrect} 题
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '32px',
                padding: '20px 48px',
                background: '#f8fafc',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: themeColor }}>
                  {score}
                  <span style={{ fontSize: '18px' }}>分</span>
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>本次得分</div>
              </div>
              <div style={{ width: '1px', background: '#cbd5e1' }} />
              <div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a' }}>
                  {totalCorrect}/{questions.length}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>正确题数</div>
              </div>
            </div>

            <button
              onClick={handleRestart}
              style={{
                padding: '12px 32px',
                borderRadius: '10px',
                border: 'none',
                background: themeColor,
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: `0 4px 16px ${themeColor}40`,
                marginTop: '12px',
              }}
            >
              🔄 再次挑战演练
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
