# Bilingual Quarto Website Fix - Complete Solution

## Problem Diagnosis
When running `quarto preview` from root, Quarto uses the root `_quarto.yml` for ALL pages, including Polish pages in `/pl`. The `pl/_quarto.yml` is ignored unless you explicitly render from that directory.

## Solution: Unified Configuration with JavaScript Enhancement

We'll use a **single root configuration** with **enhanced JavaScript translation** that works reliably with `quarto preview`.

## Step-by-Step Implementation

### Step 1: Update Root _quarto.yml

Add language profile support to the root configuration.
