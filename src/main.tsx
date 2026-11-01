import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './club.css';
import './expansion.css';
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return {error}; }
  render() { if(this.state.error) return <main className="loading"><h1>별빛 길이 잠시 흐려졌어요.</h1><p>저장된 추억은 지우지 않았어요. 다시 만나러 갈까요?</p><button className="primary" onClick={()=>location.reload()}>다시 불러오기</button><details><summary>자세한 정보</summary>{this.state.error.message}</details></main>;return this.props.children; }
}
const root=document.getElementById('root');if(!root)throw new Error('게임을 표시할 공간을 찾지 못했어요.');
createRoot(root).render(<ErrorBoundary><App/></ErrorBoundary>);
