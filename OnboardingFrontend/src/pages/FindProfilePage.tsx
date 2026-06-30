import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router'
import { searchEmployees } from '../api/employeesApi'
import { AppShell } from '../components/AppShell'
import { profileSetupContent } from '../content/profileSetup'
import type { EmployeeSearchResult } from '../models/employee'
import './FindProfilePage.css'

type SearchState = 'idle' | 'loading' | 'success' | 'error'

export function FindProfilePage() {
  const { findProfile } = profileSetupContent
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [results, setResults] = useState<EmployeeSearchResult[]>([])
  const [searchState, setSearchState] = useState<SearchState>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSearchState('loading')
    setResults([])

    try {
      const employees = await searchEmployees(firstName.trim(), lastName.trim())
      setResults(employees)
      setSearchState('success')
    } catch {
      setSearchState('error')
    }
  }

  const canSubmit = firstName.trim().length > 0 && lastName.trim().length > 0

  return (
    <AppShell currentStep={2}>
      <main className="page page--centered page-enter">
        <section className="form-panel">
          <Link className="back-link" to="/">
            <span aria-hidden="true">←</span> {findProfile.back}
          </Link>

          <div className="page-heading">
            <p className="eyebrow">{findProfile.eyebrow}</p>
            <h1>{findProfile.title}</h1>
            <p>{findProfile.description}</p>
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="field-grid">
              <label className="field">
                <span>{findProfile.firstNameLabel}</span>
                <input
                  autoComplete="given-name"
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder={findProfile.firstNamePlaceholder}
                  required
                  value={firstName}
                />
              </label>

              <label className="field">
                <span>{findProfile.lastNameLabel}</span>
                <input
                  autoComplete="family-name"
                  onChange={(event) => setLastName(event.target.value)}
                  placeholder={findProfile.lastNamePlaceholder}
                  required
                  value={lastName}
                />
              </label>
            </div>

            <button
              className="button button--primary button--full"
              disabled={!canSubmit || searchState === 'loading'}
              type="submit"
            >
              {searchState === 'loading' ? findProfile.submitting : findProfile.submit}
              {searchState !== 'loading' && <span aria-hidden="true">→</span>}
            </button>
          </form>

          <div className="search-feedback" aria-live="polite">
            {searchState === 'error' && (
              <p className="notice notice--error">
                {findProfile.requestError}
              </p>
            )}

            {searchState === 'success' && results.length === 0 && (
              <div className="notice">
                <strong>{findProfile.emptyTitle}</strong>
                <p>{findProfile.emptyDescription}</p>
              </div>
            )}

            {results.length > 0 && (
              <div className="results-list">
                <p className="results-label">
                  {findProfile.resultsLabel(results.length)}
                </p>
                {results.map((employee) => (
                  <Link
                    className="profile-result result-enter"
                    key={employee.id}
                    to={`/confirm-profile/${employee.id}`}
                  >
                    <span className="avatar" aria-hidden="true">
                      {employee.firstName[0]}{employee.lastName[0]}
                    </span>
                    <span className="profile-result__details">
                      <strong>{employee.firstName} {employee.lastName}</strong>
                      <span>{employee.jobTitle} · {employee.teamName}</span>
                    </span>
                    <span className="profile-result__arrow" aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </AppShell>
  )
}
